// src/components/GhostWriter/GenerateContent.tsx

import React, { useState } from 'react';
import axios from '../../services/api'; // Adjust the path if necessary
import { useSearchParams } from 'react-router-dom';
import { Box, Button, TextField, Typography, Alert, CircularProgress, Card, CardContent, Snackbar } from '@mui/material';

interface BlogPost {
  id: number;
  persona: string;
  title: string;
  content: string;
  created_at: string;
}

const GenerateContent: React.FC = () => {
  const [searchParams] = useSearchParams();
  const personaIdParam = searchParams.get('personaId');
  const personaId = personaIdParam ? Number(personaIdParam) : null;
  const [prompt, setPrompt] = useState<string>('');
  const [content, setContent] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const handleGenerate = async () => {
    if (!prompt) {
      setError('Please enter a prompt.');
      setOpen(true);
      return;
    }
    if (!personaId) {
      setError('Invalid Persona ID.');
      setOpen(true);
      return;
    }
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`personas/${personaId}/generate_content/`, {
        prompt: prompt,
      });
      setContent(response.data);
      setError(null);
      setPrompt('');
    } catch (err: any) {
      console.error('Error generating content:', err);
      if (err.response && err.response.data) {
        setError(JSON.stringify(err.response.data));
      } else {
        setError('Failed to generate content.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div">
            Generate Content
          </Typography>
          <TextField
            fullWidth
            label="Enter your prompt"
            variant="outlined"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            sx={{ my: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleGenerate}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Generate'}
          </Button>
          {content && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6">Generated Content:</Typography>
              <Typography variant="body1">{content.content}</Typography>
            </Box>
          )}
          <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            message={error}
          />
        </CardContent>
      </Card>
    </Box>
  );
};

export default GenerateContent;

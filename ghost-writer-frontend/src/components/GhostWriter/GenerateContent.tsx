// src/components/GhostWriter/GenerateContent.tsx

import React, { useState, useEffect } from 'react';
import axios from '../../services/api'; // Adjust the path if necessary
import { useSearchParams } from 'react-router-dom';
import { Box, Button, TextField, Typography, Alert, CircularProgress, Card, CardContent, Snackbar, Tooltip } from '@mui/material';

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
  const [personaName, setPersonaName] = useState<string | null>(null);

  useEffect(() => {
    if (personaId) {
      axios.get(`personas/${personaId}/`).then(response => {
        setPersonaName(response.data.name);
      }).catch(err => {
        console.error('Error fetching persona name:', err);
        setError('Failed to fetch persona name.');
        setOpen(true);
      });
    }
  }, [personaId]);

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
        prompt,
      });
      setContent(response.data);
    } catch (err) {
      console.error('Error generating content:', err);
      setError('Failed to generate content. Please try again.');
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSnackbar = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ maxWidth: 600, mx: 'auto', mt: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Generate Content
          </Typography>
          {personaName && (
            <Typography variant="h6" component="div" gutterBottom>
              Current Persona: {personaName}
            </Typography>
          )}
          <Tooltip title="Enter a creative prompt to generate content based on the selected persona." arrow>
            <TextField
              fullWidth
              label="Prompt"
              placeholder="Enter your prompt here"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              margin="normal"
              variant="outlined"
            />
          </Tooltip>
          <Button
            variant="contained"
            color="primary"
            onClick={handleGenerate}
            disabled={loading}
            fullWidth
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Generate'}
          </Button>
          {content && (
            <Box mt={2}>
              <Typography variant="h6">Generated Content</Typography>
              <Typography>{content.title}</Typography>
              <Typography>{content.content}</Typography>
            </Box>
          )}
        </CardContent>
      </Card>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default GenerateContent;

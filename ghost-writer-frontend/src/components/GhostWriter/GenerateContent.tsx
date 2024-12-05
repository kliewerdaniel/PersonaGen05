// src/components/GhostWriter/GenerateContent.tsx

import React, { useState, useEffect } from 'react';
import axios from '../../services/api';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Alert, CircularProgress, Card, CardContent, Snackbar, Tooltip, Grid, Chip } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

interface BlogPost {
  id: number;
  persona: string;
  title: string;
  content: string;
  created_at: string;
}

interface Persona {
  id: number;
  name: string;
  description: string;
  vocabulary_complexity: number;
  sentence_structure: string;
  paragraph_organization: string;
  tone: string;
  formality_level: number;
  emotional_expressiveness: number;
  humor_sarcasm_usage: number;
  technical_jargon_usage: number;
  decision_making_style: string;
  core_values: string;
  dominant_motivations: string;
}

const GenerateContent: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const personaId = searchParams.get('personaId');
  
  const [prompt, setPrompt] = useState<string>('');
  const [content, setContent] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [persona, setPersona] = useState<Persona | null>(null);

  useEffect(() => {
    const fetchPersona = async () => {
      if (!personaId) {
        setError('No persona selected. Please select a persona first.');
        setOpen(true);
        navigate('/personas');
        return;
      }

      try {
        const response = await axios.get(`api/personas/${personaId}/`);
        setPersona(response.data);
      } catch (err) {
        console.error('Error fetching persona:', err);
        setError('Failed to fetch persona details.');
        setOpen(true);
      }
    };

    fetchPersona();
  }, [personaId, navigate]);

  const handleGenerate = async () => {
    if (!prompt) {
      setError('Please enter a prompt.');
      setOpen(true);
      return;
    }
    if (!personaId) {
      setError('No persona selected. Please select a persona first.');
      setOpen(true);
      navigate('/personas');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(`/personas/${personaId}/generate-content/`, {
        prompt,
      });
      setContent(response.data);
      setOpen(false);
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

  const getPersonaChartData = (persona: Persona) => {
    return [
      { name: 'Vocabulary', value: persona.vocabulary_complexity },
      { name: 'Formality', value: persona.formality_level },
      { name: 'Emotion', value: persona.emotional_expressiveness },
      { name: 'Humor', value: persona.humor_sarcasm_usage },
      { name: 'Technical', value: persona.technical_jargon_usage },
    ];
  };

  if (!personaId) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6" color="error">
          No persona selected. Please select a persona first.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: '800px', mx: 'auto', p: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Generate Content
          </Typography>
          
          {persona && (
            <Box mb={3}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6" component="div">
                  Writing as: {persona.name}
                </Typography>
              </Box>
              
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {persona.description}
              </Typography>
              
              <Grid container spacing={2} sx={{ mt: 2 }}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Writing Style
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    <Chip 
                      label={`Structure: ${persona.sentence_structure}`} 
                      size="small" 
                      color="primary" 
                      variant="outlined"
                    />
                    <Chip 
                      label={`Tone: ${persona.tone}`} 
                      size="small" 
                      color="primary" 
                      variant="outlined"
                    />
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" gutterBottom>
                    Personality
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    <Chip 
                      label={`Decision: ${persona.decision_making_style}`} 
                      size="small" 
                      color="secondary" 
                      variant="outlined"
                    />
                    <Chip 
                      label={`Values: ${persona.core_values}`} 
                      size="small" 
                      color="secondary" 
                      variant="outlined"
                    />
                  </Box>
                </Grid>
              </Grid>

              <Box sx={{ mt: 3, height: 120 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={getPersonaChartData(persona)}>
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 10]} />
                    <RechartsTooltip />
                    <Bar dataKey="value" fill="#1976d2" />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </Box>
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
              multiline
              rows={3}
            />
          </Tooltip>
          
          <Button
            variant="contained"
            color="primary"
            onClick={handleGenerate}
            disabled={loading}
            fullWidth
            sx={{ mt: 2 }}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Generate'}
          </Button>

          {content && (
            <Box mt={3}>
              <Typography variant="h6" gutterBottom>Generated Content</Typography>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="h6" gutterBottom>{content.title}</Typography>
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                    {content.content}
                  </Typography>
                </CardContent>
              </Card>
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

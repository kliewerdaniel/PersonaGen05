// src/components/GhostWriter/PersonaList.tsx

import React, { useEffect, useState } from 'react';
import axios from '../../services/api';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Typography, Card, CardContent, CardActions, CircularProgress, Avatar, Grid, Chip } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

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
  openness_to_experience: number;
  empathy_level: number;
  self_confidence: number;
  decision_making_style: string;
  core_values: string;
  dominant_motivations: string;
}

const PersonaList: React.FC = () => {
  const [personas, setPersonas] = useState<Persona[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPersonas = async () => {
      try {
        const response = await axios.get('personas/');
        setPersonas(response.data);
      } catch (err) {
        console.error('Error fetching personas:', err);
        setError('Failed to load personas.');
      } finally {
        setLoading(false);
      }
    };

    fetchPersonas();
  }, []);

  const handleSelectPersona = (personaId: number) => {
    navigate(`/generate?personaId=${personaId}`);
  };

  const handleEditPersona = (personaId: number) => {
    navigate(`/persona/edit/${personaId}`);
  };

  const handleExportPersona = (persona: Persona) => {
    const dataStr = JSON.stringify(persona, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${persona.name}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDeletePersona = async (personaId: number) => {
    try {
      await axios.delete(`personas/${personaId}/`);
      setPersonas(personas.filter(persona => persona.id !== personaId));
    } catch (err) {
      console.error('Error deleting persona:', err);
      setError('Failed to delete persona.');
    }
  };

  const getPersonaChartData = (persona: Persona) => {
    return [
      { name: 'Vocabulary', value: persona.vocabulary_complexity },
      { name: 'Formality', value: persona.formality_level },
      { name: 'Emotion', value: persona.emotional_expressiveness },
      { name: 'Humor', value: persona.humor_sarcasm_usage },
      { name: 'Technical', value: persona.technical_jargon_usage },
      { name: 'Openness', value: persona.openness_to_experience },
      { name: 'Empathy', value: persona.empathy_level },
      { name: 'Confidence', value: persona.self_confidence },
    ];
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }
  
  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: '1400px', mx: 'auto', p: 4 }}>
      <Typography 
        variant="h3" 
        gutterBottom 
        align="center" 
        sx={{ 
          mb: 6,
          fontWeight: 700,
          color: 'primary.main'
        }}
      >
        Writing Personas
      </Typography>
      
      <Grid container spacing={4}>
        {personas.map((persona) => (
          <Grid item xs={12} md={6} lg={4} key={persona.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Avatar 
                    sx={{ 
                      bgcolor: 'primary.main',
                      width: 60,
                      height: 60,
                      mr: 2,
                      fontSize: '1.5rem',
                      fontWeight: 700,
                    }}
                  >
                    {persona.name.charAt(0)}
                  </Avatar>
                  <Box>
                    <Typography variant="h5" gutterBottom>
                      {persona.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {persona.description}
                    </Typography>
                  </Box>
                </Box>

                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Writing Style
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
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
                    <Chip 
                      label={`Organization: ${persona.paragraph_organization}`} 
                      size="small" 
                      color="primary" 
                      variant="outlined"
                    />
                  </Box>

                  <Typography variant="subtitle2" gutterBottom>
                    Personality
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
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
                </Box>

                <Box sx={{ mt: 3, height: 200 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Characteristics
                  </Typography>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={getPersonaChartData(persona)} layout="vertical">
                      <XAxis type="number" domain={[0, 10]} />
                      <YAxis dataKey="name" type="category" width={80} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#1976d2" />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>

              <CardActions sx={{ justifyContent: 'space-between', flexWrap: 'wrap' }}>
                <Button size="small" onClick={() => handleSelectPersona(persona.id)}>Select</Button>
                <Button size="small" onClick={() => handleEditPersona(persona.id)}>Edit</Button>
                <Button size="small" onClick={() => handleExportPersona(persona)}>Export</Button>
                <Button size="small" color="error" onClick={() => handleDeletePersona(persona.id)}>Delete</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PersonaList;

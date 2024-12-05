// src/components/GhostWriter/PersonaList.tsx

import React, { useEffect, useState } from 'react';
import axios from '../../services/api'; // Adjust the path if necessary
import { useNavigate } from 'react-router-dom';
import './PersonaList.css'; // Import the CSS file for styling
import { Box, Button, Typography, Card, CardContent, CardActions, CircularProgress, Avatar, Grid } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface Persona {
  id: number;
  name: string;
  description: string;
  data: Record<string, any>;
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

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ maxWidth: 1200, mx: 'auto', mt: 4 }}>
      <Grid container spacing={3}>
        {personas.map((persona) => (
          <Grid item xs={12} sm={6} md={4} key={persona.id}>
            <Card sx={{ minWidth: 275, position: 'relative', overflow: 'visible' }}>
              <CardContent>
                <Avatar sx={{ bgcolor: 'primary.main', width: 56, height: 56, mb: 2 }}>
                  {persona.name.charAt(0)}
                </Avatar>
                <Typography variant="h5" component="div">
                  {persona.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {persona.description}
                </Typography>
                <ResponsiveContainer width="100%" height={100}>
                  <BarChart data={Object.entries(persona.data).map(([key, value]) => ({ name: key, value }))}>
                    <XAxis dataKey="name" hide />
                    <YAxis hide />
                    <Tooltip />
                    <Bar dataKey="value" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleSelectPersona(persona.id)}>Generate</Button>
                <Button size="small" onClick={() => handleExportPersona(persona)}>Export</Button>
                <Button size="small" onClick={() => handleDeletePersona(persona.id)}>Delete</Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default PersonaList;

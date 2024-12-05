// src/components/GhostWriter/BlogPosts.tsx

import React, { useEffect, useState } from 'react';
import axios from '../../services/api'; // Adjust the path if necessary
import { CircularProgress, Typography, Box, Card, CardContent, Button } from '@mui/material';

interface BlogPost {
  id: number;
  persona_name: string;
  title: string;
  content: string;
  created_at: string;
}

const BlogPosts: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await axios.get('content/');
        setBlogPosts(response.data);
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError('Failed to load blog posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPosts();
  }, []);

  const deleteBlogPost = async (id: number) => {
    try {
      await axios.delete(`content/${id}/`);
      setBlogPosts((prevPosts) => prevPosts.filter((post) => post.id !== id));
    } catch (err) {
      console.error('Error deleting blog post:', err);
      setError('Failed to delete blog post.');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box p={4} sx={{ maxWidth: '800px', mx: 'auto' }}>
      <Typography variant="h4" gutterBottom align="center">
        Blog Posts
      </Typography>
      {blogPosts.length === 0 ? (
        <Typography variant="body1" align="center">No blog posts found.</Typography>
      ) : (
        blogPosts.map((post) => (
          <Card key={post.id} variant="outlined" sx={{ mb: 3, boxShadow: 2 }}>
            <CardContent>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>
                {post.title || 'Untitled'}
              </Typography>
              <Typography variant="body1" paragraph>
                {post.content.split('\n').map((paragraph, index) => (
                  <Typography key={index} paragraph>
                    {paragraph}
                  </Typography>
                ))}
              </Typography>
              <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                By: {post.persona_name} on {new Date(post.created_at).toLocaleString()}
              </Typography>
              <Button variant="contained" color="secondary" onClick={() => deleteBlogPost(post.id)} sx={{ mt: 2 }}>
                Delete
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
};

export default BlogPosts;

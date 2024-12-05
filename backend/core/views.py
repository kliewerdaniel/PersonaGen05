# core/views.py

from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializers import PersonaSerializer, ContentPieceSerializer
from .models import Persona, ContentPiece
from .utils import generate_content
import logging

logger = logging.getLogger(__name__)

class PersonaViewSet(viewsets.ModelViewSet):
    serializer_class = PersonaSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Persona.objects.filter(author=self.request.user.author)

    @action(detail=True, methods=['post'])
    def generate_content(self, request, pk=None):
        persona = self.get_object()
        prompt = request.data.get('prompt')
        
        if not prompt:
            return Response({'error': 'Prompt is required'}, status=400)
            
        generated_content = generate_content(persona.data, prompt)
        
        if generated_content:
            title, content = self._split_content(generated_content)
            content_piece = ContentPiece.objects.create(
                author=request.user.author,
                persona=persona,
                title=title or 'Untitled',
                content=content or '',
                status='draft'
            )
            serializer = ContentPieceSerializer(content_piece)
            return Response(serializer.data, status=201)
        return Response({'error': 'Failed to generate content'}, status=500)

    def _split_content(self, generated_content):
        lines = generated_content.strip().split('\n')
        title = lines[0] if lines else 'Untitled'
        content = '\n'.join(lines[1:]) if len(lines) > 1 else ''
        return title, content

class ContentPieceViewSet(viewsets.ModelViewSet):
    serializer_class = ContentPieceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ContentPiece.objects.filter(author=self.request.user.author)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user.author)

# core/serializers.py

from rest_framework import serializers
from .models import Author, Persona, ContentPiece
from .utils import analyze_writing_sample, generate_content
import logging

logger = logging.getLogger(__name__)

class AuthorSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = Author
        fields = ['id', 'username', 'email', 'bio', 'created_at']

class PersonaSerializer(serializers.ModelSerializer):
    writing_sample = serializers.CharField(write_only=True, required=False)
    content_count = serializers.SerializerMethodField()

    class Meta:
        model = Persona
        fields = ['id', 'name', 'description', 'data', 'writing_sample', 
                 'is_active', 'created_at', 'updated_at', 'content_count']
        read_only_fields = ['id', 'data', 'created_at', 'updated_at', 'content_count']

    def get_content_count(self, obj):
        return obj.contentpiece_set.count()

    def create(self, validated_data):
        writing_sample = validated_data.pop('writing_sample', None)
        author = self.context['request'].user.author
        validated_data['author'] = author

        if writing_sample:
            analyzed_data = analyze_writing_sample(writing_sample)
            if analyzed_data:
                validated_data['data'] = analyzed_data
            else:
                logger.error("Failed to analyze writing sample.")
                raise serializers.ValidationError({"writing_sample": "Failed to analyze the writing sample."})

        return super().create(validated_data)

class ContentPieceSerializer(serializers.ModelSerializer):
    persona_name = serializers.CharField(source='persona.name', read_only=True)
    
    class Meta:
        model = ContentPiece
        fields = ['id', 'title', 'content', 'persona', 'persona_name', 'status',
                 'tags', 'word_count', 'created_at', 'updated_at', 'published_at']
        read_only_fields = ['id', 'word_count', 'created_at', 'updated_at']

from django.db import migrations, models

class Migration(migrations.Migration):
    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='persona',
            name='vocabulary_complexity',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='sentence_structure',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='paragraph_organization',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='idiom_usage',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='metaphor_frequency',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='simile_frequency',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='tone',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='punctuation_style',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='contraction_usage',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='pronoun_preference',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='passive_voice_frequency',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='rhetorical_question_usage',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='list_usage_tendency',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='personal_anecdote_inclusion',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='pop_culture_reference_frequency',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='technical_jargon_usage',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='parenthetical_aside_frequency',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='humor_sarcasm_usage',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='emotional_expressiveness',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='emphatic_device_usage',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='quotation_frequency',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='analogy_usage',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='sensory_detail_inclusion',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='onomatopoeia_usage',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='alliteration_frequency',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='word_length_preference',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='foreign_phrase_usage',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='rhetorical_device_usage',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='statistical_data_usage',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='personal_opinion_inclusion',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='transition_usage',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='reader_question_frequency',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='imperative_sentence_usage',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='dialogue_inclusion',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='regional_dialect_usage',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='hedging_language_frequency',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='language_abstraction',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='personal_belief_inclusion',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='repetition_usage',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='subordinate_clause_frequency',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='verb_type_preference',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='sensory_imagery_usage',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='symbolism_usage',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='digression_frequency',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='formality_level',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='reflection_inclusion',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='irony_usage',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='neologism_frequency',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='ellipsis_usage',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='cultural_reference_inclusion',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='stream_of_consciousness_usage',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='openness_to_experience',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='conscientiousness',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='extraversion',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='agreeableness',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='emotional_stability',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='dominant_motivations',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='core_values',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='decision_making_style',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='empathy_level',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='self_confidence',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='risk_taking_tendency',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='idealism_vs_realism',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='conflict_resolution_style',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AddField(
            model_name='persona',
            name='relationship_orientation',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
    ]

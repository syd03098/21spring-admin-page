from rest_framework import serializers

from api.model.movie.models import Movie, MovieImage

class MovieImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = MovieImage
        fields = '__all__'


class MovieSerializer(serializers.ModelSerializer):
    images = MovieImageSerializer(many=True, read_only=True)

    class Meta:
        model = Movie
        fields = '__all__'

    def create(self, validated_data):
        images_data = self.context['request'].FILES
        movie = Movie.objects.create(**validated_data)
        for image_data in images_data.getlist('image'):
            MovieImage.objects.create(movie=movie, image=image_data)
        return movie
from rest_framework import serializers
from .models import Node, Edge


class NodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Node
        fields = ['id', 'type', 'position', 'data', 'measured']

class EdgeSerializer(serializers.ModelSerializer):
    source = serializers.PrimaryKeyRelatedField(queryset=Node.objects.all())
    target = serializers.PrimaryKeyRelatedField(queryset=Node.objects.all())

    class Meta:
        model = Edge
        fields = ['id', 'source', 'target', 'type']
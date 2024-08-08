from rest_framework import serializers
from .models import Node, Edge


class NodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Node
        fields = ['id', 'node_id', 'type', 'position', 'data', 'measured']

class EdgeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Edge
        fields = ['id', 'edge_id', 'source', 'target', 'type']
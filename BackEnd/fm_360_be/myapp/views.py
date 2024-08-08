from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Node, Edge
from .serializers import NodeSerializer, EdgeSerializer


# Create your views here.

@api_view(['GET'])
def get_flow(request):
    nodes = Node.objects.all()
    edges = Edge.objects.all()
    node_serializer = NodeSerializer(nodes, many=True)
    edge_serializer = EdgeSerializer(edges, many=True)
    return Response({
        "nodes": node_serializer.data,
        "edges": edge_serializer.data
    })

@api_view(['POST'])
def save_flow(request):
    nodes_data = request.data.get('nodes', [])
    edges_data = request.data.get('edges', [])
    
    # # Delete existing data
    # Node.objects.all().delete()
    # Edge.objects.all().delete()
    
    # Create new nodes
    node_serializer = NodeSerializer(data=nodes_data, many=True)
    if node_serializer.is_valid():
        node_serializer.save()
    else:
        return Response(node_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # Create new edges
    edge_serializer = EdgeSerializer(data=edges_data, many=True)
    if edge_serializer.is_valid():
        edge_serializer.save()
    else:
        return Response(edge_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    return Response({"status": "flow data saved"}, status=status.HTTP_201_CREATED)

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Flow
from .serializers import FlowSerializer

@api_view(['POST'])
def save_flow(request):
    serializer = FlowSerializer(data=request.data)
    if serializer.is_valid():
        # Check if a flow with the same name already exists
        flow, created = Flow.objects.update_or_create(
            name=serializer.validated_data['name'],
            defaults={
                'nodes': serializer.validated_data['nodes'],
                'edges': serializer.validated_data['edges'],
            }
        )
        if created:
            return Response({'message': 'Data Saved!!!'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'message': 'Data Updated!!!'}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def list_flow_names(request):
    flows = Flow.objects.all()  # Retrieve all flow objects
    names = [flow.name for flow in flows]  # Extract names
    return Response(names, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_flow(request, name):
    try:
        flow = Flow.objects.get(name=name)
    except Flow.DoesNotExist:
        return Response({'error': 'Not Found'}, status=status.HTTP_404_NOT_FOUND)
    
    serializer = FlowSerializer(flow)
    return Response(serializer.data, status=status.HTTP_200_OK)

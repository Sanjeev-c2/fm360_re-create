from django.db import models

# Create your models here.

class Node(models.Model):
    id = models.AutoField(primary_key=True)  # Auto-generated primary key
    node_id = models.CharField(max_length=100, unique=True)  # Ensure node_id is unique
    type = models.CharField(max_length=50)
    position = models.JSONField()  # Stores position as a JSON object
    data = models.JSONField()      # Stores additional data like image as a JSON object
    measured = models.JSONField()  # Stores measured dimensions as a JSON object

    def __str__(self):
        return f"Node ID: {self.node_id} (PK: {self.id})"

class Edge(models.Model):
    id = models.AutoField(primary_key=True)  # Auto-generated primary key
    edge_id = models.CharField(max_length=100)  # Custom identifier (not unique)
    source = models.ForeignKey(Node, related_name='outgoing_edges', on_delete=models.CASCADE, to_field='node_id')
    target = models.ForeignKey(Node, related_name='incoming_edges', on_delete=models.CASCADE, to_field='node_id')
    type = models.CharField(max_length=50)

    def __str__(self):
        return f"Edge ID: {self.edge_id} (PK: {self.id})"

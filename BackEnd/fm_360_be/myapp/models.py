from django.db import models

# Create your models here.

class Node(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    type = models.CharField(max_length=50)
    position = models.JSONField()  # Stores position as a JSON object
    data = models.JSONField()      # Stores additional data like image as a JSON object
    measured = models.JSONField()  # Stores measured dimensions as a JSON object

    def __str__(self):
        return self.id

class Edge(models.Model):
    id = models.CharField(max_length=50, primary_key=True)
    source = models.ForeignKey(Node, related_name='outgoing_edges', on_delete=models.CASCADE, to_field='id')
    target = models.ForeignKey(Node, related_name='incoming_edges', on_delete=models.CASCADE, to_field='id')
    type = models.CharField(max_length=50)

    def __str__(self):
        return self.id
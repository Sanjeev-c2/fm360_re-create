from django.db import models
from django.db.models import JSONField

class Flow(models.Model):
    name = models.CharField(max_length=255, unique=True)  # Ensure unique names
    nodes = JSONField()  # Stores the list of nodes
    edges = JSONField()  # Stores the list of edges

    def __str__(self):
        return self.name
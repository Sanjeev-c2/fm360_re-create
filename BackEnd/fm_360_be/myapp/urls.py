from django.urls import path
# from . import views
from .views import get_flow, save_flow, list_flow_names

app_name='myapp'

urlpatterns=[
    path('flow/save/', save_flow, name='save_flow'),
    path('flow/names/', list_flow_names, name='list_flow_names'),
    path('flow/<str:name>/', get_flow, name='get_flow'),
]

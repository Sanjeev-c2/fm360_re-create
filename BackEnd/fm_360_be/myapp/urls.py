from django.urls import path
# from . import views
from .views import get_flow, save_flow

app_name='myapp'

urlpatterns=[
    path('flow/', get_flow, name='get_flow'),
    path('flow/save/', save_flow, name='save_flow'),
]

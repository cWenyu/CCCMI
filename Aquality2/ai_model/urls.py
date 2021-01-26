from django.urls import path
from ai_model.views import object_detection_api

# Controlling The Path of Application
urlpatterns = [
    path('ai_model/detect_image/', object_detection_api),
]

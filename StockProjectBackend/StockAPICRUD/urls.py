from django.urls import path
from .views import StockDetailAPIView, HealthCheckAPIView

urlpatterns = [
    path('health/', HealthCheckAPIView.as_view(), name='health-check'),
    path('stocks/create/', StockDetailAPIView.as_view(), name='stock-create'),
    path('stocks/<str:symbol>/', StockDetailAPIView.as_view(), name='stock-detail'),
]

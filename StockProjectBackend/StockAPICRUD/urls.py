from django.urls import path
from .views import StockListAPIView, StockDetailAPIView, HealthCheckAPIView

urlpatterns = [
    path('health/', HealthCheckAPIView.as_view(), name='health-check'),
    path('stocks/create/', StockDetailAPIView.as_view(), name='stock-create'),
    path('stocks/update/', StockDetailAPIView.as_view(), name='stock-update'),
    path('stocks/', StockListAPIView.as_view(), name='stock-list'),
    path('stocks/<str:symbol>/', StockDetailAPIView.as_view(), name='stock-detail'),
]

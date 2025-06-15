# from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Stock
from .serializers import StockSerializer
from django.shortcuts import get_object_or_404

class StockListAPIView(APIView):
    # No permission_classes yet — open access for now

    def get(self, request):
        stocks = Stock.objects.all()
        serializer = StockSerializer(stocks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class StockDetailAPIView(APIView):
    def get(self, request, symbol):
        # Look up the stock by symbol or return 404 if not found
        stock = get_object_or_404(Stock, symbol=symbol.upper())  # .upper() ensures case-insensitive match
        serializer = StockSerializer(stock)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request):
        symbol = request.data.get("symbol", "").upper()

        if not symbol:
            return Response({"error": "Missing 'symbol' in request body."}, status=status.HTTP_400_BAD_REQUEST)

        stock = get_object_or_404(Stock, symbol=symbol)
        serializer = StockSerializer(stock, data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        data = request.data

        # Check if symbol already exists
        if Stock.objects.filter(symbol=data.get("symbol")).exists():
            return Response({"error": "Stock with this symbol already exists."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = StockSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
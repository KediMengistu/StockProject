from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from .permissions import IsInternalRequest
from .models import Stock
from .serializers import StockSerializer
from django.utils.timezone import now as tz_now

class HealthCheckAPIView(APIView):
    authentication_classes = []  # 🚫 No auth required
    permission_classes = []      # 🚫 No permissions required

    def get(self, request):
        return Response({"status": "ok"}, status=status.HTTP_200_OK)

class StockDetailAPIView(APIView):
    def get_permissions(self):
        if self.request.method == "GET":
            return [IsAuthenticated()]
        elif self.request.method in ["POST", "DELETE"]:
            return [IsInternalRequest()]
        return super().get_permissions()

    def get_authenticators(self):
        if self.request.method in ["POST", "DELETE"]:
            return []
        return super().get_authenticators()

    def get(self, request, symbol):
        stocks = Stock.objects.filter(symbol=symbol.upper()).order_by("-timestamp")[:9]
        serializer = StockSerializer(stocks, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        data = request.data
        symbol = data.get("symbol", "").upper()

        if not symbol:
            return Response({"error": "Missing 'symbol' field."}, status=status.HTTP_400_BAD_REQUEST)

        # ✅ Only delete if there are already 9 or more entries
        if Stock.objects.filter(symbol=symbol).count() >= 9:
            delete_response = self.delete(request, symbol)
            if delete_response.status_code not in [status.HTTP_204_NO_CONTENT, status.HTTP_404_NOT_FOUND]:
                return Response({"error": "Failed to delete oldest stock."}, status=delete_response.status_code)

        # ➕ Create the new stock
        serializer = StockSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        print(f"[{tz_now()}] ❌ Serializer errors for symbol '{symbol}':")
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, symbol):
        symbol = symbol.upper()
        oldest_entry = Stock.objects.filter(symbol=symbol).order_by("timestamp").first()

        if oldest_entry:
            oldest_entry.delete()
            return Response({"message": f"Oldest entry for '{symbol}' deleted."}, status=status.HTTP_204_NO_CONTENT)
        else:
            return Response({"message": f"No entry found for symbol '{symbol}'."}, status=status.HTTP_404_NOT_FOUND)

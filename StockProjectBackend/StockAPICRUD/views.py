from rest_framework.views import APIView                    # Base class for all DRF API views
from rest_framework.response import Response                # Used to return HTTP responses
from rest_framework import status                           # Provides standard status codes
from rest_framework.permissions import IsAuthenticated      # DRF built-in permission for Firebase-protected routes
from .permissions import IsInternalRequest                  # Custom permission to check internal API key
from django.shortcuts import get_object_or_404              # Helper to fetch object or return 404
from .models import Stock                                    # The Stock model (MariaDB-backed)
from .serializers import StockSerializer                    # Serializer to convert Stock objects to JSON and vice versa
from django.utils.timezone import now as tz_now             # For printing timestamps in logs

class HealthCheckAPIView(APIView):
    authentication_classes = []  # 🚫 No auth required
    permission_classes = []      # 🚫 No permissions required

    def get(self, request):
        return Response({"status": "ok"}, status=status.HTTP_200_OK)

# 🔓 Used for internal access (e.g. cron jobs)
class StockListAPIView(APIView):
    permission_classes = [IsInternalRequest]  # Requires internal API key in header

    def get(self, request):
        stocks = Stock.objects.all()                                  # Fetch all Stock records
        serializer = StockSerializer(stocks, many=True)               # Serialize them
        return Response(serializer.data, status=status.HTTP_200_OK)  # Return JSON response

# 🔐 This view supports all operations, each with its own permission type
class StockDetailAPIView(APIView):
    # ✅ Dynamic permissions based on HTTP method
    def get_permissions(self):
        if self.request.method == "GET":
            return [IsAuthenticated()]               # Firebase-authenticated users only
        elif self.request.method in ["PUT", "POST", "DELETE"]:
            return [IsInternalRequest()]             # Internal server requests only
        return super().get_permissions()

    # ✅ Optional: Skip Firebase token validation on internal routes
    def get_authenticators(self):
        if self.request.method in ["PUT", "POST", "DELETE"]:
            return []  # Skip global FirebaseAuthentication
        return super().get_authenticators()

    # 🔐 Firebase-authenticated users only
    def get(self, request, symbol):
        stock = get_object_or_404(Stock, symbol=symbol.upper())     # Case-insensitive symbol lookup
        serializer = StockSerializer(stock)                         # Serialize the object
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 🔒 Internal only: Modify an existing stock entry
    def put(self, request):
        symbol = request.data.get("symbol", "").upper()
        if not symbol:
            return Response({"error": "Missing 'symbol' in request body."}, status=status.HTTP_400_BAD_REQUEST)

        stock = get_object_or_404(Stock, symbol=symbol)
        serializer = StockSerializer(stock, data=request.data)  # Deserialize and validate input

        if serializer.is_valid():
            serializer.save()                                   # Save updates
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 🔒 Internal only: Create a new stock entry
    def post(self, request):
        data = request.data

        if Stock.objects.filter(symbol=data.get("symbol")).exists():
            return Response({"error": "Stock with this symbol already exists."}, status=status.HTTP_400_BAD_REQUEST)

        serializer = StockSerializer(data=data)  # Deserialize input
        if serializer.is_valid():
            serializer.save()                   # Create a new record
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        # 🪵 Logging serializer validation errors and the payload
        print(f"[{tz_now()}] ❌ Serializer errors for symbol '{data.get('symbol')}':")
        print(serializer.errors)
        print(f"[{tz_now()}] 📦 Payload was:")
        print(data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # 🔒 Internal only: Delete an existing stock entry
    def delete(self, request, symbol):
        stock = get_object_or_404(Stock, symbol=symbol.upper())   # Fetch or 404
        stock.delete()                                            # Remove it from DB
        return Response({"message": f"Stock '{symbol.upper()}' deleted."}, status=status.HTTP_204_NO_CONTENT)

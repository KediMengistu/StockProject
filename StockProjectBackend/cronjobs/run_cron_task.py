import os
import requests
from datetime import datetime
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Internal API (your Django backend)
BACKEND_HOST = os.getenv("BACKEND_HOST")
BACKEND_PORT = os.getenv("BACKEND_PORT")
INTERNAL_API_BASE = f"http://{BACKEND_HOST}:{BACKEND_PORT}/api/stocks"
INTERNAL_API_KEY = os.getenv("INTERNAL_API_KEY")

# External API
EXTERNAL_API_KEY = os.getenv("EXTERNAL_API_KEY")
EXTERNAL_API_URL = "https://financialmodelingprep.com/stable/quote"

# Hardcoded fallback stock symbols
DEFAULT_SYMBOLS = ["AAPL", "MSFT", "GOOGL", "AMZN", "NVDA", "META", "TSLA", "ADBE", "INTC", "NFLX"]

def log(msg):
    now = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC")
    print(f"[{now}] {msg}")

def get_all_stocks():
    headers = {"X-INTERNAL-KEY": INTERNAL_API_KEY}
    try:
        log("Requesting internal stock list from backend...")
        response = requests.get(f"{INTERNAL_API_BASE}/", headers=headers)
        if response.status_code == 200:
            log(f"Successfully received {len(response.json())} stock(s).")
            return response.json()
        else:
            log(f"Failed to fetch internal stocks: HTTP {response.status_code}")
            return []
    except Exception as e:
        log(f"Error connecting to backend for internal stocks: {e}")
        return []

def fetch_stock_data(symbol):
    params = {
        "symbol": symbol,
        "exchange": "NASDAQ",
        "apikey": EXTERNAL_API_KEY
    }
    try:
        log(f"Fetching external stock data for: {symbol}")
        response = requests.get(EXTERNAL_API_URL, params=params)

        try:
            data = response.json()
        except ValueError:
            log(f"❌ Non-JSON response received for {symbol}")
            return None

        if response.status_code != 200:
            log(f"❌ HTTP error for {symbol}: {response.status_code} - {response.text}")
            return None

        if isinstance(data, dict) and "error" in data:
            log(f"❌ API error for {symbol}: {data['error']}")
            return None

        if isinstance(data, list) and len(data) > 0 and isinstance(data[0], dict):
            log(f"Successfully fetched data for {symbol}")
            return data[0]
        else:
            log(f"❌ Unexpected data format received for {symbol}: {data}")
            return None

    except requests.RequestException as e:
        log(f"❌ Request failed for {symbol}: {e}")
    return None

def normalize_stock_data(stock):
    return {
        "symbol": stock.get("symbol"),
        "name": stock.get("name"),
        "price": stock.get("price"),
        "changes_percentage": stock.get("changePercentage"),
        "change": stock.get("change"),
        "day_low": stock.get("dayLow"),
        "day_high": stock.get("dayHigh"),
        "year_high": stock.get("yearHigh"),
        "year_low": stock.get("yearLow"),
        "market_cap": stock.get("marketCap"),
        "price_avg_50": stock.get("priceAvg50"),
        "price_avg_200": stock.get("priceAvg200"),
        "volume": stock.get("volume"),
        "exchange": stock.get("exchange"),
        "open": stock.get("open"),
        "previous_close": stock.get("previousClose"),
        "timestamp": stock.get("timestamp")
    }

def create_stock(stock_data):
    headers = {"X-INTERNAL-KEY": INTERNAL_API_KEY}
    try:
        log(f"Creating stock: {stock_data['symbol']}")
        response = requests.post(f"{INTERNAL_API_BASE}/create/", json=stock_data, headers=headers)
        log(f"Created {stock_data['symbol']}: HTTP {response.status_code}")
    except Exception as e:
        log(f"Failed to create stock {stock_data['symbol']}: {e}")

def update_stock(stock_data):
    headers = {"X-INTERNAL-KEY": INTERNAL_API_KEY}
    try:
        log(f"Updating stock: {stock_data['symbol']}")
        response = requests.put(f"{INTERNAL_API_BASE}/update/", json=stock_data, headers=headers)
        log(f"Updated {stock_data['symbol']}: HTTP {response.status_code}")
    except Exception as e:
        log(f"Failed to update stock {stock_data['symbol']}: {e}")

def run_cron_task():
    log("📡 Starting cron task...")

    internal_stocks = get_all_stocks()

    if not internal_stocks:
        log("No internal stocks found — initializing from default list...")
        for symbol in DEFAULT_SYMBOLS:
            stock_data = fetch_stock_data(symbol)
            if stock_data:
                normalized = normalize_stock_data(stock_data)
                create_stock(normalized)
            else:
                log(f"❌ Could not fetch/create stock for {symbol}")
    else:
        log("Internal stocks found — proceeding to update...")
        for stock in internal_stocks:
            symbol = stock.get("symbol")
            if symbol:
                updated_data = fetch_stock_data(symbol)
                if updated_data:
                    normalized = normalize_stock_data(updated_data)
                    update_stock(normalized)
                else:
                    log(f"❌ Could not fetch update data for {symbol}")
            else:
                log("⚠️ Skipping stock with missing symbol.")

    log("✅ Cron task completed.")

if __name__ == "__main__":
    run_cron_task()

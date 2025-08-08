import os
import requests
from datetime import datetime
from dotenv import load_dotenv
from pathlib import Path

# Load environment variables
load_dotenv()

# Internal API
BACKEND_HOST = os.environ.get("BACKEND_HOST")
BACKEND_PORT = os.environ.get("BACKEND_PORT")
INTERNAL_API_BASE = f"http://{BACKEND_HOST}:{BACKEND_PORT}/api/stocks"
INTERNAL_API_KEY = os.environ.get("INTERNAL_API_KEY")

# External API
EXTERNAL_API_KEY = os.getenv("EXTERNAL_API_KEY")
EXTERNAL_API_URL = "https://financialmodelingprep.com/stable/quote"

# Symbols to fetch
DEFAULT_SYMBOLS = ["AAPL", "MSFT", "GOOGL", "AMZN", "NVDA", "META", "TSLA", "ADBE", "INTC", "NFLX"]

def log(msg):
    now = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC")
    print(f"[{now}] {msg}")

def fetch_stock_data(symbol):
    params = {
        "symbol": symbol,
        "exchange": "NASDAQ",
        "apikey": EXTERNAL_API_KEY
    }
    try:
        full_url = requests.Request('GET', EXTERNAL_API_URL, params=params).prepare().url
        log(f"📡 Fetching from External API: {full_url}")

        response = requests.get(EXTERNAL_API_URL, params=params)
        data = response.json()
        
        if response.status_code != 200 or not isinstance(data, list) or not data:
            log(f"❌ Error or empty data for {symbol}: {response.status_code} {data}")
            return None

        return data[0]

    except Exception as e:
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
        response = requests.post(f"{INTERNAL_API_BASE}/create/", json=stock_data, headers=headers)
        log(f"✅ Created stock {stock_data['symbol']} | Status: {response.status_code}")
    except Exception as e:
        log(f"❌ Failed to create stock {stock_data['symbol']}: {e}")

def run_cron_task():
    log("📡 Cron job started")
    for symbol in DEFAULT_SYMBOLS:
        stock_data = fetch_stock_data(symbol)
        if stock_data:
            normalized = normalize_stock_data(stock_data)
            create_stock(normalized)
        else:
            log(f"⚠️ Skipping {symbol} due to fetch failure")
    log("✅ Cron job completed")

if __name__ == "__main__":
    run_cron_task()

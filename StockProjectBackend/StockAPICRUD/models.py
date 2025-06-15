from django.db import models

# Create your models here.
from django.db import models

class Stock(models.Model):
    symbol = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=255)
    price = models.DecimalField(max_digits=20, decimal_places=4)
    changes_percentage = models.FloatField()
    change = models.FloatField()
    day_low = models.DecimalField(max_digits=20, decimal_places=4)
    day_high = models.DecimalField(max_digits=20, decimal_places=4)
    year_high = models.DecimalField(max_digits=20, decimal_places=4)
    year_low = models.DecimalField(max_digits=20, decimal_places=4)
    market_cap = models.BigIntegerField()
    price_avg_50 = models.DecimalField(max_digits=20, decimal_places=4)
    price_avg_200 = models.DecimalField(max_digits=20, decimal_places=4)
    volume = models.BigIntegerField()
    avg_volume = models.BigIntegerField()
    exchange = models.CharField(max_length=50)
    open = models.DecimalField(max_digits=20, decimal_places=4)
    previous_close = models.DecimalField(max_digits=20, decimal_places=4)
    eps = models.DecimalField(max_digits=20, decimal_places=4)
    pe = models.DecimalField(max_digits=20, decimal_places=4)
    earnings_announcement = models.DateTimeField()
    shares_outstanding = models.BigIntegerField()
    timestamp = models.BigIntegerField()

    def __str__(self):
        return f"{self.symbol} - {self.name}"

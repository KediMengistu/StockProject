from django.db import models

class Stock(models.Model):
    symbol = models.TextField()
    name = models.TextField()
    price = models.FloatField()
    changes_percentage = models.FloatField()
    change = models.FloatField()
    day_low = models.FloatField()
    day_high = models.FloatField()
    year_high = models.FloatField()
    year_low = models.FloatField()
    market_cap = models.BigIntegerField()
    price_avg_50 = models.FloatField()
    price_avg_200 = models.FloatField()
    volume = models.BigIntegerField()
    exchange = models.TextField()
    open = models.FloatField()
    previous_close = models.FloatField()
    timestamp = models.BigIntegerField()

    class Meta:
        ordering = ["-timestamp"]  # Always get newest first

    def __str__(self):
        return f"{self.symbol} - {self.name}"

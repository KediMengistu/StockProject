# Use official Python image (version matches your local env)
FROM python:3.13.3-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1         

# Set the working directory inside the container
WORKDIR /app

# Install system dependencies required for mysqlclient
RUN apt-get update && apt-get install -y \
    gcc \
    default-libmysqlclient-dev \
    pkg-config \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements and install dependencies
COPY ./requirements.txt /app/
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Copy entire Django backend code into container
COPY . /app/

# ⬇️ Copy and make wait-for-mysql.sh executable
COPY wait-for-mysql.sh /app/
RUN chmod +x /app/wait-for-mysql.sh

# Expose the port your Django app will run on
EXPOSE 8000

# Run the Django development server after waiting for MySQL
CMD ["/app/wait-for-mysql.sh", "python", "manage.py", "runserver", "0.0.0.0:8000"]

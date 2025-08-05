import boto3
import os
import json

SECRET_NAME = os.getenv("FIREBASE_SECRET_NAME")
REGION_NAME = os.getenv("AWS_REGION")
OUTPUT_PATH = os.getenv("FIREBASE_CREDENTIALS")

def fetch_and_store_secret():
    client = boto3.client("secretsmanager", region_name=REGION_NAME)

    try:
        response = client.get_secret_value(SecretId=SECRET_NAME)
        secret_string = response["SecretString"]

        # Ensure firebase directory exists
        os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)

        # Write the secret JSON to file
        with open(OUTPUT_PATH, "w") as f:
            f.write(secret_string)

        print(f"✅ Firebase credentials stored at {OUTPUT_PATH}")

    except Exception as e:
        print(f"❌ Failed to retrieve Firebase secret: {e}")
        raise

if __name__ == "__main__":
    fetch_and_store_secret()

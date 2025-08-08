import boto3
import os
import json
import sys

SECRET_NAME = os.environ.get("FIREBASE_SECRET_NAME")
REGION_NAME = os.environ.get("AWS_REGION")
OUTPUT_PATH = os.environ.get("FIREBASE_CREDENTIALS")

def fetch_and_store_secret():
    """Fetch Firebase credentials from AWS Secrets Manager and save to file."""
    
    # Validate environment variables
    if not all([SECRET_NAME, REGION_NAME, OUTPUT_PATH]):
        print(f"❌ Missing required environment variables:")
        print(f"   FIREBASE_SECRET_NAME: {SECRET_NAME or 'NOT SET'}")
        print(f"   AWS_REGION: {REGION_NAME or 'NOT SET'}")
        print(f"   FIREBASE_CREDENTIALS: {OUTPUT_PATH or 'NOT SET'}")
        sys.exit(1)
    
    print(f"📥 Fetching secret '{SECRET_NAME}' from region '{REGION_NAME}'...")
    
    try:
        # Connect to AWS Secrets Manager
        client = boto3.client("secretsmanager", region_name=REGION_NAME)
        response = client.get_secret_value(SecretId=SECRET_NAME)
        secret_string = response["SecretString"]
        
        # Parse the secret
        secret_data = json.loads(secret_string)
        
        # Handle both formats: key-value pair or direct JSON
        if "FIREBASE_CREDENTIALS_JSON" in secret_data:
            # It's wrapped in a key-value pair
            firebase_creds = secret_data["FIREBASE_CREDENTIALS_JSON"]
            # If the value is a string, parse it
            if isinstance(firebase_creds, str):
                firebase_creds_json = json.loads(firebase_creds)
            else:
                firebase_creds_json = firebase_creds
            print("📦 Found Firebase credentials in key-value format")
        else:
            # Assume it's direct Firebase JSON
            firebase_creds_json = secret_data
            print("📦 Found Firebase credentials in direct JSON format")
        
        # Validate the credentials
        required_fields = ["type", "project_id", "private_key", "client_email"]
        missing_fields = [field for field in required_fields if field not in firebase_creds_json]
        
        if missing_fields:
            raise ValueError(f"Firebase credentials missing required fields: {missing_fields}")
        
        if firebase_creds_json.get("type") != "service_account":
            raise ValueError(f"Invalid type: expected 'service_account', got '{firebase_creds_json.get('type')}'")
        
        # Create directory if it doesn't exist
        os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
        
        # Write credentials to file
        with open(OUTPUT_PATH, "w") as f:
            json.dump(firebase_creds_json, f, indent=2)
        
        # Verify the file was written correctly
        with open(OUTPUT_PATH, "r") as f:
            verification = json.load(f)
        
        print(f"✅ Firebase credentials successfully stored at {OUTPUT_PATH}")
        print(f"   Project ID: {verification.get('project_id')}")
        print(f"   Service Account: {verification.get('client_email')}")
        
    except client.exceptions.ResourceNotFoundException:
        print(f"❌ Secret '{SECRET_NAME}' not found in AWS Secrets Manager")
        print(f"   Please check the secret name and region")
        sys.exit(1)
    except client.exceptions.InvalidRequestException as e:
        print(f"❌ Invalid request to AWS Secrets Manager: {e}")
        sys.exit(1)
    except json.JSONDecodeError as e:
        print(f"❌ Failed to parse secret as JSON: {e}")
        sys.exit(1)
    except Exception as e:
        print(f"❌ Unexpected error: {type(e).__name__}: {e}")
        sys.exit(1)

if __name__ == "__main__":
    fetch_and_store_secret()
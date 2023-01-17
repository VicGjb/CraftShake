import boto3
import os
# from .secret_config import AWS_S3

client = boto3.client(
    's3',
    aws_access_key_id=os.environ.get('AWS_ACCESS_KEY_ID'),
    aws_secret_access_key= os.environ.get('AWS_SECRET_ACCESS_KEY')
    )
bucket = os.environ.get('AWS_STORAGE_BUCKET_NAME')


def remove_file_from_aws_3(filename):
    client.delete_object(
        Bucket = bucket,
        Key = str(filename)
    ) 

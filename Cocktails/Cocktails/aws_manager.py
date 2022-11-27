import boto3
from .secret_config import AWS_S3

client = boto3.client(
    's3',
    aws_access_key_id=AWS_S3['AWS_ACCESS_KEY_ID'],
    aws_secret_access_key= AWS_S3['AWS_SECRET_ACCESS_KEY']
    )
bucket = AWS_S3['AWS_STORAGE_BUCKET_NAME']


def remove_file_from_aws_3(filename):
    client.delete_object(
        Bucket = bucket,
        Key = str(filename)
    ) 

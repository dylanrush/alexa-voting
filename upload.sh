zip -r upload.zip ./*
aws s3 cp upload.zip s3://dylanrush
aws lambda update-function-code --function-name voting-reminder --s3-bucket dylanrush --s3-key upload.zip

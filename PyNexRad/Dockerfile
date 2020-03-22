FROM python:3.7.3
RUN pip install --upgrade pip
WORKDIR /app
ADD . /app

RUN pip install --no-cache-dir -r requirements.txt
ENV NAME opentoAll
CMD ["python","nexrad/Nexrad_S3_Demo.py"]
FROM python:3.7.3
RUN pip install --upgrade pip
WORKDIR /app
ADD . /app

RUN pip3 install -r requirements.txt
EXPOSE 9092
ENV NAME opentoAll
CMD ["python","nexrad/Nexrad_S3_Demo.py"]
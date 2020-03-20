# Test file for checking producer
import json
from kafka import KafkaProducer
from kafka import KafkaConsumer
producer = KafkaProducer(bootstrap_servers=['127.0.0.1:9092'],
                         value_serializer=lambda x: 
                         json.dumps(x).encode('utf-8'))
consumer = KafkaConsumer(
    'user.data_processor.data',
     bootstrap_servers=['127.0.0.1:9092'],
     auto_offset_reset='earliest',
     enable_auto_commit=True,
     group_id='user.data_processor.group',
     value_deserializer=lambda x: json.loads(x.decode('utf-8')))
for message in consumer:
        message = message.value
        print("Message received : " +str(message))
        print(message['url'])
message['url']=plot_url
producer.send('user.data_processor.data', value=message).add_callback(on_send_success).add_errback(on_send_error)
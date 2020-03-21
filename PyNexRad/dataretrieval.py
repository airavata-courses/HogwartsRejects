# Test file for checking producer
import json
from kafka import KafkaProducer
from kafka import KafkaConsumer
producer = KafkaProducer(bootstrap_servers=['127.0.0.1:9092'],
                         value_serializer=lambda x: 
                         json.dumps(x).encode('utf-8'))
consumer = KafkaConsumer(
    "user.session_management.data",
     bootstrap_servers=['127.0.0.1:9092'],
     auto_offset_reset='earliest',
     enable_auto_commit=True,
     group_id='user.data_processor.group',
     value_deserializer=lambda x: json.loads(x.decode('utf-8')))

def on_send_success(record_metadata):
    print('[kafka-producer -> ' + record_metadata.topic + ']: broker update success')

def on_send_error(excp):
    log.error('Producer error', exc_info=excp)

for message in consumer:
        message = message.value
        print("Message received : " +str(message))
        try:
            ssmgt_msg= {
            "jobID":message['jobid'],
            "userName":message['userName'],
            "hostURL":"imageurl",
            "status":"MODELING_IN_PROGRESS",
        }
            print(ssmgt_msg)
            producer.send('user.post_processor.data', value=ssmgt_msg).add_callback(on_send_success).add_errback(on_send_error)
        except:
            print("error in message")
# message['url']=plot_url

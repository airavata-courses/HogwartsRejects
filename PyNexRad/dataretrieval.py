from pykafka import KafkaClient
client = KafkaClient(hosts="127.0.0.1:9092")
topic = client.topics['test.data']
producer = topic.get_sync_producer()
consumer = topic.get_simple_consumer()
producer.produce(b"2019/06/26/KVWX/KVWX20190626_221105_V06")

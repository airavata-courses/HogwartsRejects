"""
Plotting AWS-hosted NEXRAD Level 2 Data
=======================================================

Access NEXRAD radar data via Amazon Web Services and plot with MetPy

Accessing data remotely is a powerful tool for big data, such as NEXRAD radar data.
By accessing it in the cloud, you can save time and space from downloading the data locally.

"""

import boto3
import botocore
from botocore.client import Config
import matplotlib.pyplot as plt
from metpy.io import Level2File
from metpy.plots import add_timestamp, ctables
from mpl_toolkits.axes_grid1 import make_axes_locatable
import numpy as np
import pyimgur
from pykafka import KafkaClient
import json
import plot_graph


# msg='2019/06/26/KVWX/KVWX20190626_221105_V06'
isFailure = True
while(isFailure):
    try:
        client = KafkaClient(hosts="kafka:9092")
        topic = client.topics['user.data_processor.data']
        consumer = topic.get_simple_consumer()
        isFailure = False
    except:
        print("An exception occurred")
        isFailure = True

while True:
    msg = consumer.consume()
    print("%s [key=%s, id=%s, offset=%s]" %
          (msg.value, msg.partition_key, msg.partition_id, msg.offset))
    string_msg = msg.value.decode("utf-8")
    json_msg=json.loads(string_msg)
    print(json_msg.keys())
    imageurl = plot_graph.plot_graph(json_msg['url'])
    print(imageurl)
    ssmgt_msg= {
        "jobID":json_msg['jobid'],
        "userName":json_msg['userName'],
        "hostURL":imageurl,
        "status":"MODELING_IN_PROGRESS",
    }
    print(ssmgt_msg)
    topic = client.topics['user.session_management.data']
    producer = topic.get_sync_producer()
    producer.produce(bytes(json.dumps(ssmgt_msg),'utf-8'))
    print("Message Produced to 'user.session_management.data'")
    pp_msg= {
        "jobID":json_msg['jobid'],
        "userName":json_msg['userName'],
        "hostURL":imageurl,
    }
    topic = client.topics['user.post_processor.data']
    producer = topic.get_sync_producer()
    producer.produce(bytes(json.dumps(pp_msg),'utf-8'))
    print("Message Produced to 'user.post_processor.data'")

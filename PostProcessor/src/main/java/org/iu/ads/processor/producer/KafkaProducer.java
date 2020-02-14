package org.iu.ads.processor.producer;

import org.iu.ads.processor.repository.PostProcessorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;


@Service
public class KafkaProducer {

    public static final String TOPIC = "PostProcessorProducer";

    @Autowired
    private KafkaTemplate<String, String> kafkaTemplate;

    @Autowired
    PostProcessorRepository postProcessorRepository;

    public void produce(String message) {
        kafkaTemplate.send(TOPIC, message);
    }
}


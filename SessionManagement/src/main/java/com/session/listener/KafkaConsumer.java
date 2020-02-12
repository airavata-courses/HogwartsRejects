package com.session.listener;

import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumer {

    @KafkaListener(topics = "SessionManagement", groupId = "group_id")
    public void consume(String message) {

    }
}

package com.session.produce;

import com.session.documents.SessionData;
import com.session.repository.SessionManagement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KafkaProducer {

    public static final String TOPIC = "SessionHistory";

    @Autowired
    private KafkaTemplate<String, List<SessionData>> kafkaTemplate;

    @Autowired
    SessionManagement sessionManagementRepository;

    public void produce(String userName) {
        kafkaTemplate.send(TOPIC, sessionManagementRepository.findByUserName(userName));
    }
}

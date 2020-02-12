package com.session.listener;

import com.session.documents.SessionData;
import com.session.repository.SessionManagement;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KafkaConsumer {

    @Autowired
    SessionManagement sessionManagementRepository;

    @KafkaListener(topics = "SessionManagement", groupId = "group_sm")
    public void consume(String message) {
        JSONObject json = new JSONObject();
        try {
            json = (JSONObject) new JSONParser().parse(message);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        if(json.isEmpty() || json.get(SessionData.USER_NAME) == null || json.get(SessionData.JOB_ID) == null) {
            return;
        }

        List<SessionData> sessionDataList = sessionManagementRepository.findByUserName((String)json.get(SessionData.USER_NAME));
        if(sessionDataList.isEmpty()) {
            SessionData sessionData = new SessionData((String)json.get(SessionData.USER_NAME), (String)json.get(SessionData.JOB_ID), (String)json.get(SessionData.STATUS));

            if(json.get(SessionData.QUERY) != null)
                sessionData.setQuery((String)json.get(SessionData.QUERY));

            if(json.get(SessionData.HOST_URL) != null)
                sessionData.setHostURL((String)json.get(SessionData.HOST_URL));

            sessionManagementRepository.save(sessionData);

        } else {
            SessionData sessionData = sessionDataList.get(0);

            if(json.get(SessionData.QUERY) != null)
                sessionData.setQuery((String)json.get(SessionData.QUERY));

            if(json.get(SessionData.HOST_URL) != null)
                sessionData.setHostURL((String)json.get(SessionData.HOST_URL));

            if(json.get(SessionData.STATUS) != null)
                sessionData.setHostURL((String)json.get(SessionData.STATUS));

            sessionManagementRepository.save(sessionData);
        }
    }
}

package org.iu.ads.listener;

import org.iu.ads.config.KafkaConfiguration;
import org.iu.ads.documents.SessionData;
import org.iu.ads.repository.SessionManagement;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KafkaConsumer {

    public static final String TOPIC = "user.session_management.data";

    @Autowired
    SessionManagement sessionManagementRepository;

    @KafkaListener(topics = TOPIC, groupId = KafkaConfiguration.CONSUMER_GROUP)
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
            setSessionData(json, sessionData);

            sessionManagementRepository.save(sessionData);

        } else {
            for(SessionData sessionData : sessionDataList) {
                if(sessionData.getJobID().equals(json.get(SessionData.JOB_ID))) {
                    setSessionData(json, sessionData);
                    sessionManagementRepository.save(sessionData);
                    return;
                }
            }

            SessionData sessionData = new SessionData((String)json.get(SessionData.USER_NAME), (String)json.get(SessionData.JOB_ID), (String)json.get(SessionData.STATUS));
            setSessionData(json, sessionData);

            sessionManagementRepository.save(sessionData);
        }
    }

    private void setSessionData(JSONObject json, SessionData sessionData) {
        if(json.get(SessionData.QUERY) != null)
            sessionData.setQuery((String)json.get(SessionData.QUERY));

        if(json.get(SessionData.HOST_URL) != null)
            sessionData.setHostURL((String)json.get(SessionData.HOST_URL));

        if(json.get(SessionData.STATUS) != null)
            sessionData.setStatus((String)json.get(SessionData.STATUS));
    }
}

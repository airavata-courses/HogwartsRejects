package org.iu.ads.processor.listener;

import org.iu.ads.processor.config.KafkaConfiguration;
import org.iu.ads.processor.document.PostData;
import org.iu.ads.processor.producer.KafkaProducer;
import org.iu.ads.processor.repository.PostProcessorRepository;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class KafkaConsumer {

    public static final String TOPIC = "user.post_processor.data";

    @Autowired
    PostProcessorRepository postProcessorRepository;

    @Autowired
    KafkaProducer kafkaProducer;

    @KafkaListener(topics = TOPIC, groupId = KafkaConfiguration.CONSUMER_GROUP)
    public void consume(String message) {
        JSONObject json = new JSONObject();
        try {
            json = (JSONObject) new JSONParser().parse(message);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        if(json.isEmpty() || json.get(PostData.USER_NAME) == null || json.get(PostData.JOB_ID) == null) {
            return;
        }

        List<PostData> userJobsByName = postProcessorRepository.findByUserName((String)json.get(PostData.USER_NAME));
        List<PostData> userJobsByJobID = postProcessorRepository.findByJobID((String)json.get(PostData.USER_NAME));

        if(!userJobsByName.isEmpty() && !userJobsByJobID.isEmpty()) {
            for(PostData userJob : userJobsByName) {
                if(userJob.getJobID().equals(json.get(PostData.JOB_ID))) {
                    userJob.setHostURL((String) json.get(PostData.HOST_URL));
                    postProcessorRepository.save(userJob);
                    break;
                }
            }
        } else
            postProcessorRepository.save(new PostData((String)json.get(PostData.USER_NAME), (String)json.get(PostData.JOB_ID), (String)json.get(PostData.HOST_URL)));

        kafkaProducer.produce((String)json.get(PostData.HOST_URL));
    }
}

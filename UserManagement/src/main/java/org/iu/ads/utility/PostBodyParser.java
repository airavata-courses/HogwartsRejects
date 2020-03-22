package org.iu.ads.utility;

import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class PostBodyParser {

    public Map<String, String> getPostBodyInAMap(HttpServletRequest request) {

        Map<String, String> postBody = new HashMap<>();
        try {
            populatePostBody(postBody, request.getReader().lines().collect(Collectors.joining()));
        } catch (IOException e) {
            e.printStackTrace();
        }

        return postBody;
    }

    protected void populatePostBody(Map<String, String> parameterMap, String body) {
        try {
            JSONObject userDetails = (JSONObject) new JSONParser().parse(body);
            for(Object key: userDetails.keySet()) {
                if(userDetails.get(key) instanceof String) {
                    parameterMap.put((String)key, (String)userDetails.get(key));
                }
            }
        } catch (ParseException e) {
            e.printStackTrace();
        }
    }
}

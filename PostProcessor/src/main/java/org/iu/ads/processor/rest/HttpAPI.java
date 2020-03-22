package org.iu.ads.processor.rest;

import org.iu.ads.processor.document.PostData;
import org.iu.ads.processor.repository.PostProcessorRepository;
import org.iu.ads.processor.utility.PostBodyParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
public class HttpAPI {

    @Autowired
    public PostProcessorRepository postProcessorRepository;

    @Autowired
    public PostBodyParser postBodyParser;

    @RequestMapping(value = "postprocessor/fetchURL")
    public ResponseEntity<?> fetchURL(HttpServletRequest request, HttpServletResponse response) {
        Map<String, String> result = new HashMap<>();
        Map<String, String> postBody = postBodyParser.getPostBodyInAMap(request);


        if(postBody.isEmpty() || postBody.get("userName") == null || postBody.get(PostData.JOB_ID) == null) {
            return ResponseEntity.ok(result);
        }

        String hostURL = "";

        List<PostData> userJobsByName = postProcessorRepository.findByUserName(postBody.get(PostData.USER_NAME));
        if(!userJobsByName.isEmpty()) {
            for(PostData userJob : userJobsByName) {
                if(userJob.getJobID().equals(postBody.get(PostData.JOB_ID))) {
                    hostURL = userJob.getHostURL();
                    break;
                }
            }
        }

        result.put(PostData.HOST_URL, hostURL);
        return ResponseEntity.ok(result);
    }
}

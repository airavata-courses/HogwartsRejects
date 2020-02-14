package org.iu.ads.rest;

import org.iu.ads.documents.SessionData;
import org.iu.ads.repository.SessionManagement;
import org.iu.ads.utility.PostBodyParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

@RestController
public class HttpAPI {

    @Autowired
    public SessionManagement sessionManagementRepo;

    @Autowired
    public PostBodyParser postBodyParser;

    @RequestMapping(value = "/session/fetchUsers")
    public ResponseEntity<?> fetchUsers(HttpServletRequest request, HttpServletResponse response) {
        Map<String, String> postBody = postBodyParser.getPostBodyInAMap(request);

        String userName = postBody.get("userName");

        return ResponseEntity.ok(sessionManagementRepo.findByUserName(userName));

    }

}

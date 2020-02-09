package com.users.service;

import com.users.repository.UserRepository;
import com.users.utility.JwtUtility;
import com.users.utility.PostBodyParser;
import com.users.view.UserInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.Map;

@RestController
public class HttpAPI {

    public static final String JWT_TOKEN = "jwtToken";
    @Autowired
    public UserRepository userRepo;

    @Autowired
    public PostBodyParser postBodyParser;

    @Autowired
    public JwtUtility jwtUtility;

    @RequestMapping(value = "/login")
    public ResponseEntity<?> login(HttpServletRequest request, HttpServletResponse response) {
        Map<String, String> result = new HashMap<>();
        Map<String, String> postBody = postBodyParser.getPostBodyInAMap(request);

        String userName = postBody.get("userName");
        String password = postBody.get("password");

        for(UserInfo userInfo : userRepo.findByUserName(userName)) {
            if(userInfo.getPassword().equals(password)) {
                result.put(JWT_TOKEN, jwtUtility.generateToken(userInfo));
                break;
            }
        }

        return ResponseEntity.ok(result);
    }

    @RequestMapping(value = "/signup")
    public ResponseEntity<?> signup(HttpServletRequest request, HttpServletResponse response) {
        Map<String, String> result = new HashMap<>();

        Map<String, String> postBody = postBodyParser.getPostBodyInAMap(request);

        String userName = postBody.get("userName");
        String firstName = postBody.get("firstName");
        String lastName = postBody.get("lastName");
        String password = postBody.get("password");

        UserInfo userInfo = new UserInfo(firstName, lastName, userName, password);

        if(!userRepo.findByUserName(userName).isEmpty()) {
            return ResponseEntity.ok(result);
        }

        userRepo.save(userInfo);

        result.put(JWT_TOKEN, jwtUtility.generateToken(userInfo));
        return ResponseEntity.ok(result);
    }
}

package org.iu.ads.utility;

import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureException;
import org.iu.ads.view.UserInfo;
import org.junit.Assert;
import org.junit.Test;

public class TestJwtUtility {

    JwtUtility jwtUtility = new JwtUtility();

    @Test
    public void testExtractingJwtToken() {
        UserInfo userInfo = new UserInfo();
        userInfo.setUserName("vivek");

        String token = jwtUtility.generateToken(userInfo);
        Assert.assertEquals("vivek", jwtUtility.extractUserName(token.substring(7)));
    }

    @Test(expected = SignatureException.class)
    public void testExtractingWithChangeInKey() {
        String prevSecretKey = jwtUtility.getSecretKey();
        UserInfo userInfo = new UserInfo();
        userInfo.setUserName("vivek");

        try {
            String token = jwtUtility.generateToken(userInfo);
            jwtUtility.setSecretKey("randomString");
            jwtUtility.extractUserName(token.substring(7));
        } finally {
            jwtUtility.setSecretKey(prevSecretKey);
        }
    }

    @Test(expected = MalformedJwtException.class)
    public void testExtractingWithTheBearerToken() {
        UserInfo userInfo = new UserInfo();
        userInfo.setUserName("vivek");

        String token = jwtUtility.generateToken(userInfo);
        jwtUtility.extractUserName(token);
    }

}

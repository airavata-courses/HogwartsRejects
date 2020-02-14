package org.iu.ads.utility;

import org.iu.ads.view.UserInfo;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.function.Function;

@Service
public class JwtUtility {

    private String SECRET_KEY = "HogwartsRejects";

    public String extractUserName(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        Claims claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser().setSigningKey(SECRET_KEY).parseClaimsJws(token).getBody();
    }

    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    public String generateToken(UserInfo userInfo) {
        return "Bearer " + Jwts.builder().setClaims(new HashMap<>()).setSubject(userInfo.getUserName()).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000*60*60*10))
                .signWith(SignatureAlgorithm.HS512, SECRET_KEY).compact();
    }

    public boolean validateToken(String token, UserInfo userInfo) {
        String username = extractUserName(token);
        return (userInfo.getUserName().equals(username) && !isTokenExpired(token));
    }
}

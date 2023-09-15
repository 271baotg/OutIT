package com.course_management.security;


import com.course_management.model.Student;
import io.jsonwebtoken.*;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Base64;
import java.util.Date;
import java.util.HashMap;
import java.util.function.Function;

@Service
public class JwtServices {
    private static final long EXPIRE_DURATION = 24 * 60 * 60 * 1000;

    private static final String SECRET_KEY = "cZYOwmztrEbScxBzAr5X0Iiv3AXqJ10LCiC4xBMjVJ8=";

    public String generateToken(HashMap<String,Object> extraClaims, UserDetails student){
        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(student.getUsername())
                .setIssuer("Bao")
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRE_DURATION))
                .signWith(getSigninKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public String generateToken(UserDetails student){
        return generateToken(new HashMap<>(),student);
    }

    public boolean validateToken(String token){
        try {
            Jwts.parserBuilder()
                    .setSigningKey(getSigninKey())
                    .build()
                    .parseClaimsJws(token);
            return true;

        }catch (JwtException ex){

        }
        return false;

    }

    public String extractUsername(String token){
        return extractAllClaims(token).getSubject();
    }

    public Claims extractAllClaims(String token){
        return Jwts.parserBuilder()
                .setSigningKey(getSigninKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key getSigninKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}

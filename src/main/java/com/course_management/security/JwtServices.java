package com.course_management.security;


import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.function.Function;

@Service
public class JwtServices {

    private static final String SECRET_KEY = "H46+HBsuPIXrLjitk2ML9ShDw4CHzsQ5KPkWqbmJ65i6xMjkZN2LgV4YaSte5X/llGTgxTyPisYwb3mjhijxWibkHDtk2TxVkNL/ao6NJ9Ay9iwlBQObF2wDRDiZpgYg6l+DZCpSF7S0z2RPj62CYAcuX+VFYT5ly9zciVKXUT0Y+3drZwFoHFPmZiqtni/rHidqULnOMJ/K1bybbchuM+QPp+u//tgF+SNFp+f6BIg4ziVfFEAs6ifPWnASx7Uwpp/SEJZnlZ09QN7vH2csw5fa+FvQW7+LZ92+FTzHtzMKQWXNTZLcsihXZd9ENg+DWfsvvNt8toHgdgrn2KjqjgHF48mEIVAifdWl71/KzrE=";

    public String extractUsername(String token){
        return extractClaim(token, claims -> claims.getSubject());
    }

    public <T> T extractClaim(String token, Function<Claims,T> getSpecificClaim){
        final Claims claims = extractAllClaims(token);
        return getSpecificClaim.apply(claims);
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

package com.ecommerce.backend.service;

import java.util.*;
import java.security.Key;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.ecommerce.backend.model.Users;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import javax.crypto.SecretKey;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import java.util.function.*;

@Component
public class JWTService {

    private final String SECRET="5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437";

    public String generateToken(Users user) {
        Map<String,Object> claims=new HashMap<>();
        claims.put("role", user.getRole());
        return createToken(claims,user.getEmail());
    }

    private String createToken(Map<String, Object> claims,String userName){
        return Jwts.builder()
                   .claims()
                   .add(claims)
                   .subject(userName)
                   .issuedAt(new Date(System.currentTimeMillis()))
                   .expiration(new Date(System.currentTimeMillis()+60*60*30*1000L))
                   .and()
                   .signWith(getSignKey())
                   .compact();
    }

    private SecretKey getSignKey(){
        byte[] keyBytes=Decoders.BASE64.decode(SECRET);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String extractUserName(String token) {
         return extractClaim(token, Claims::getSubject);
    }

    private <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
        final Claims claims=extractAllClaims(token);
        return claimResolver.apply(claims);
        
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                    .verifyWith(getSignKey())
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        UserPrinciples userPrinciples=(UserPrinciples) userDetails;
        final String userName=extractUserName(token);
        return(userName.equals(userPrinciples.getEmail()) && !isTokenExpired(token));
    }

    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }
    
}

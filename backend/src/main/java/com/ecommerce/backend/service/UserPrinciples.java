package com.ecommerce.backend.service;

import java.util.Arrays;
import java.util.Collection;
import java.util.*;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.ecommerce.backend.model.Users;


public class UserPrinciples implements UserDetails{

    private Users user;

    public UserPrinciples(Users user){
        this.user=user;
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        String role = user.getRole();
        if (!role.startsWith("ROLE_")) {
            role = "ROLE_" + role;
        }
        SimpleGrantedAuthority authority=new SimpleGrantedAuthority(role);
        return Collections.singletonList(authority);
    }

    @Override
    public String getPassword() {
        System.out.println("user princ password");
        return user.getPassword();
    }

    @Override
    public String getUsername() {
      System.out.println("user princ username");
      return user.getUsername();   
    }

    public String getEmail(){
        return user.getEmail();
    }

    public Long getMobileNo(){
        return user.getMobile_no();
    }

    public String getRole(){
        return user.getRole();
    }
    
    
}

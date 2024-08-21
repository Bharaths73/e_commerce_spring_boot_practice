package com.ecommerce.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.ecommerce.backend.model.Users;
import com.ecommerce.backend.repo.UserRepo;

@Service
public class UsersDetailsService implements UserDetailsService{

    @Autowired
    private UserRepo repo;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        System.out.println("user details service");
        Users user=repo.findByEmail(email);

        System.out.println(user);
        if(user==null){
            throw new UsernameNotFoundException("User Not Found");
        }
        return new UserPrinciples(user);
    }
    
}

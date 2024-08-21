package com.ecommerce.backend.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

import com.ecommerce.backend.model.Users;

@Repository
public interface UserRepo extends JpaRepository<Users,Integer>{

    Users findByEmail(String email);
    
}

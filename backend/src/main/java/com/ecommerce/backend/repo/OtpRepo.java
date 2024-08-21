package com.ecommerce.backend.repo;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ecommerce.backend.model.OTP;


@Repository
public interface OtpRepo extends JpaRepository<OTP,Integer>{
    
    Optional<OTP> findByEmail(String email);
}

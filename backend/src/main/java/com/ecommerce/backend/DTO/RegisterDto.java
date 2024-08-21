package com.ecommerce.backend.DTO;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class RegisterDto {

    private String username;
    private String email;
    private Long mobile_no;
    private String password;
    private String role;
    private String otp;
}





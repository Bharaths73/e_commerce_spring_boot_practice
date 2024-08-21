package com.ecommerce.backend.service;

import java.util.Random;
import java.util.Optional;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication ;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.ecommerce.backend.DTO.OtpRequestDto;
import com.ecommerce.backend.DTO.RegisterDto;
import com.ecommerce.backend.exceptions.IncorrectOtpException;
import com.ecommerce.backend.model.JWTResponse;
import com.ecommerce.backend.model.OTP;
import com.ecommerce.backend.model.Users;
import com.ecommerce.backend.repo.OtpRepo;
import com.ecommerce.backend.repo.UserRepo;
import com.ecommerce.backend.response.ApiResponse;

import jakarta.mail.MessagingException;
import java.time.LocalDateTime;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;


    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTService jwtService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private OtpRepo otpRepo;
    
    private BCryptPasswordEncoder bCryptPasswordEncoder=new BCryptPasswordEncoder(12);

    public Users register(RegisterDto user) {
        Optional<OTP> otpUser=otpRepo.findByEmail(user.getEmail());
        if(otpUser.isPresent()){
            OTP otpEntity=otpUser.get();
            if(otpEntity.getOtp().equals(user.getOtp()) && otpEntity.getExpiresAt().isAfter(LocalDateTime.now())){
                user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
                // Users verifiedUser=modelMapper.map(user, Users.class);
                Users verifiedUser=new Users();
                verifiedUser.setEmail(user.getEmail());
                verifiedUser.setMobile_no(user.getMobile_no());
                verifiedUser.setPassword(user.getPassword());
                verifiedUser.setRole(user.getRole());
                verifiedUser.setUsername(user.getUsername());

                Users savedUser=userRepo.save(verifiedUser);
                removeOtp(otpEntity);
                return savedUser;
            }

            if(otpEntity.getExpiresAt().isBefore(LocalDateTime.now())){
                removeOtp(otpEntity);
            }

            throw new IncorrectOtpException("incorrect otp");
        }
        else{
            throw new UsernameNotFoundException("User not found");
        }
        
    }

    private void removeOtp(OTP otp){
        otpRepo.delete(otp);
    }

    public OTP sendOtp(OtpRequestDto otpRequestDto) throws MessagingException{
        Users user=userRepo.findByEmail(otpRequestDto.getEmail());
        if(user==null){
            String otp=generateOtp();
            String subject = "Verification Mail";
            String body = "Your otp for registering is "+otp;
            String email=otpRequestDto.getEmail();
            System.out.println(email);
            OTP otpModel=new OTP();
            otpModel.setEmail(email);
            otpModel.setOtp(otp);
            otpModel.setCreatedAt(LocalDateTime.now());
            otpModel.setExpiresAt(LocalDateTime.now().plusMinutes(3));
            OTP dbotp=otpRepo.save(otpModel);
            emailService.sendEmail(email, subject, body); 
            return dbotp;
        } 
        throw new IllegalStateException("User with this email already exists");
    }

    private String generateOtp(){
        Random random=new Random();
        int generatedOtp=100000+random.nextInt(900000);
        return String.valueOf(generatedOtp);
    }

    public ResponseEntity<?> login(Users user) {
            Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
            );
    
            if (authentication.isAuthenticated()) {
                String token = jwtService.generateToken(user);
                UserPrinciples userDetails = (UserPrinciples) userDetailsService.loadUserByUsername(user.getEmail());
                JWTResponse response = JWTResponse.builder()
                    .token(token)
                    .username(userDetails.getUsername())
                    .email(userDetails.getEmail())
                    .role(userDetails.getRole())
                    .build();
                return new ResponseEntity<>(response, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Failed to Authenticate", HttpStatus.UNAUTHORIZED);
            }
        } 
    

    public Users getUserDetails(Users profile) {
        UserPrinciples userDetails = (UserPrinciples) userDetailsService.loadUserByUsername(profile.getEmail());
        Users user=Users.builder()
                         .username(userDetails.getUsername())
                         .email(userDetails.getEmail())
                         .mobile_no(userDetails.getMobileNo())
                         .role(userDetails.getRole())
                         .build();
        return user;
    }
    
}

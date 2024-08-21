package com.ecommerce.backend.Config;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.ecommerce.backend.filter.JwtAuthenticationEntryPoint;
import com.ecommerce.backend.filter.JwtFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtFilter jwtFilter;

    @Autowired
    private JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{
        return httpSecurity.csrf(customizer->customizer.disable())
                            .authorizeHttpRequests(req->req.requestMatchers("/api/user/products","/api/user/login","/api/user/register","/api/user/otp")
                            .permitAll()
                            .requestMatchers("/api/admin/**")
                            .hasRole("ADMIN")
                            
                            .anyRequest().authenticated())
                            .exceptionHandling(auth->auth.authenticationEntryPoint(jwtAuthenticationEntryPoint))
                            .httpBasic(Customizer.withDefaults())
                            .sessionManagement(session->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                            .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class)
                            .build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider(){
        System.out.println("dao");
        DaoAuthenticationProvider DaoAuthenticationProvider=new DaoAuthenticationProvider();
        DaoAuthenticationProvider.setPasswordEncoder(new BCryptPasswordEncoder(12));
        DaoAuthenticationProvider.setUserDetailsService(userDetailsService);
        return DaoAuthenticationProvider;
    }

    @Bean 
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception{
        return config.getAuthenticationManager();
    }
}

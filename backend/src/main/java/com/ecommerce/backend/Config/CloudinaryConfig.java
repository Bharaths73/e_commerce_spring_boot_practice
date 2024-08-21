package com.ecommerce.backend.Config;
// Import the required packages

import com.cloudinary.*;
import com.cloudinary.utils.ObjectUtils;

import java.util.*;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Component;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary getCloudinary(){
        Map<String,String> config=new HashMap<>();
        config.put("cloud_name","dykarkvaa");
        config.put("api_key","959817311662267");
        config.put("api_secret","v6Z6Chlt82FZZfg0w3qxJv2Sruk");
    Cloudinary cloudinary = new Cloudinary(config);
    cloudinary.config.secure = true;
    return cloudinary;
    }
}

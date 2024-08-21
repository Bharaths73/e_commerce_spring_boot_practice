package com.ecommerce.backend.service;

import java.io.IOException;
import java.util.Map;
import com.cloudinary.utils.ObjectUtils;
import com.ecommerce.backend.exceptions.ImageUploadFailedException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;

@Service
public class CloudinaryImageImple implements CloudinaryImageService{

    @Autowired
    private Cloudinary cloudinary;

    @Override
    public Map upload(MultipartFile file){
        Map data;
        Map params1 = ObjectUtils.asMap(
        "folder", "e_commerce"
          );
        try {
            data = this.cloudinary.uploader().upload(file.getBytes(), params1);
            return data;
        } catch (IOException e) {
            throw new ImageUploadFailedException("Image uploading fail");
        }
        
    }
    
}

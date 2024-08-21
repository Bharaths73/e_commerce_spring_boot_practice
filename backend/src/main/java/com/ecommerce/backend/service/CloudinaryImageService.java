package com.ecommerce.backend.service;

import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

public interface CloudinaryImageService {
    public Map upload(MultipartFile file);
}

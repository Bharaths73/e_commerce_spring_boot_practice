package com.ecommerce.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ecommerce.backend.model.Product;
import com.ecommerce.backend.service.ProductService;


@RestController
@CrossOrigin
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    ProductService service;

    @PostMapping("/product")
    public ResponseEntity<?> addProduct(@RequestPart Product prod, @RequestPart MultipartFile imageFile){
            System.out.println("add product controller");
            Product product=service.addProduct(prod,imageFile);
            return new ResponseEntity<>(product,HttpStatus.OK);
        
    }

}

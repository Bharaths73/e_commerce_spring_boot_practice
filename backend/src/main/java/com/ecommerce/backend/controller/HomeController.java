package com.ecommerce.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.security.SecurityProperties.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.http44.api.Response;
import com.ecommerce.backend.DTO.OtpRequestDto;
import com.ecommerce.backend.DTO.RegisterDto;
import com.ecommerce.backend.exceptions.ProductNotFoundException;
import com.ecommerce.backend.model.Product;
import com.ecommerce.backend.model.Users;
import com.ecommerce.backend.service.EmailService;
import com.ecommerce.backend.service.ProductService;
import com.ecommerce.backend.service.UserService;

import jakarta.mail.MessagingException;

import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin
public class HomeController {
 
    private ProductService service;
    private UserService userService;
    private EmailService emailService;

    public HomeController(ProductService service,UserService userService,EmailService emailService){
        this.service=service;
        this.userService=userService;
        this.emailService=emailService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Users user){
        System.out.println("login");
        return userService.login(user);
    }

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getProducts(){
        System.out.println("Entering....");
        return new ResponseEntity<>(service.getProducts(),HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<Users> registerUser(@RequestBody RegisterDto user){
        Users data=userService.register(user);
        return new ResponseEntity<>(data,HttpStatus.OK);
    }

    @GetMapping("/product/{id}")
    public ResponseEntity<Product> geProduct(@PathVariable int id){
        Product prod=service.getProductById(id);

        if(prod!=null){
            return new ResponseEntity<>(prod,HttpStatus.OK);
        }
        else{
            throw new ProductNotFoundException("product not found");
        }
        
    }

    
    // @GetMapping("/product/{id}/image")
    // public ResponseEntity<byte[]> getImageByProductId(@PathVariable int id){
    //     Product product=service.getProductById(id);
    //     String imageFile=product.getImageDate();
    //     return new ResponseEntity<>(HttpStatus.OK);
    // }

    @PutMapping("/product/{id}")
    public ResponseEntity<String> updateProduct(@PathVariable int id, @RequestPart Product prod , @RequestPart MultipartFile imageFile) throws IOException{

        Product product=service.updateProduct(id,prod,imageFile);

        if(product!=null){
            return new ResponseEntity<>("Updated Successfully",HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>("Failed to Update",HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/product/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable int id){
        Product product=service.getProductById(id);

        if(product!=null){
            service.deleteProduct(id);
            return new ResponseEntity<>("Item deleted Successfully",HttpStatus.OK);
        }
        else{
            return new ResponseEntity<>("Item not found Successfully",HttpStatus.OK);
        }
        
    }

    @GetMapping("/product")
    public ResponseEntity<List<Product>> searchProducts(@RequestParam String keyword){
        List<Product> prod=service.searchProducts(keyword);
        return new ResponseEntity<>(prod,HttpStatus.OK);
    }

    @PostMapping("/profile")
    public ResponseEntity<Users> getUserDetails(@RequestBody Users profile){
        Users user=userService.getUserDetails(profile);
        return new ResponseEntity<>(user,HttpStatus.OK);
    }

    @PostMapping("/otp")
    public ResponseEntity<?> sendOtp(@RequestBody OtpRequestDto optDto) throws MessagingException {
       userService.sendOtp(optDto);
       return new ResponseEntity<>(optDto,HttpStatus.OK);
    }
}

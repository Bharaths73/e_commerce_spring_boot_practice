package com.ecommerce.backend.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.ecommerce.backend.model.Product;
import com.ecommerce.backend.repo.ProductRepo;

import java.io.IOException;
import java.util.*;

@Service
public class ProductService {

    private ProductRepo repo;
    private CloudinaryImageService cloudinary;

    public  ProductService(ProductRepo repo,CloudinaryImageImple cloudinary){
        this.repo=repo;
        this.cloudinary=cloudinary;
    }

    public List<Product> getProducts(){
        // int pageNo=0;
        // int pageSize=3;
        // String sortBy="brand";

        // Pageable p=PageRequest.of(pageNo, pageSize,Sort.by(sortBy).descending());
        // Page<Product> prods=repo.findAll(p);
        // System.out.println("total number of pages "+prods.getTotalPages());
        // System.out.println("total number of products "+prods.getTotalElements());
        // System.out.println("total number of products in current page "+prods.getNumberOfElements());
        // System.out.println("is last page "+prods.isLast());
        // System.out.println("has next page "+prods.hasNext());
        // return prods.getContent();
        
        List<Product> prods=repo.findAll();
        return prods;
    }

    public Product getProductById(int id){
        return repo.findById(id).orElse(null);
    }

    public Product addProduct(Product prod, MultipartFile imageFile){
        System.out.println("service of add product");
        Map data=cloudinary.upload(imageFile);
       prod.setImageName(imageFile.getOriginalFilename());
       prod.setImageType(imageFile.getContentType());
       prod.setImageDate((String) data.get("url"));
       return repo.save(prod);
    }

    public Product updateProduct(int id, Product prod, MultipartFile imageFile) throws IOException {
        prod.setImageName(imageFile.getOriginalFilename());
        prod.setImageType(imageFile.getContentType());
        // prod.setImageDate(imageFile.getBytes());
        return repo.save(prod);
    }

    public void deleteProduct(int id) {
        repo.deleteById(id);
    }

    public List<Product> searchProducts(String keyword) {
        return repo.searchProducts(keyword);
    }
}

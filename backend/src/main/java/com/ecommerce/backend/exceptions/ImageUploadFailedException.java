package com.ecommerce.backend.exceptions;

public class ImageUploadFailedException extends RuntimeException{
    public ImageUploadFailedException(String message){
        super(message);
    }
}

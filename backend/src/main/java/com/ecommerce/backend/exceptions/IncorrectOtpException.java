package com.ecommerce.backend.exceptions;

public class IncorrectOtpException extends RuntimeException{
    public IncorrectOtpException(String message){
        super(message);
    }
}

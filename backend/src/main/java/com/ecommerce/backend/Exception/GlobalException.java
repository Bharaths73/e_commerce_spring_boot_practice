package com.ecommerce.backend.Exception;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.ecommerce.backend.exceptions.ImageUploadFailedException;
import com.ecommerce.backend.exceptions.IncorrectOtpException;
import com.ecommerce.backend.exceptions.ProductNotFoundException;
import com.ecommerce.backend.response.ApiResponse;

@RestControllerAdvice
public class GlobalException {
    
    @ExceptionHandler(ProductNotFoundException.class)
    public ResponseEntity<ApiResponse<?>> handleException(ProductNotFoundException e){
        ErrorResponse errorResponse=ErrorResponse.builder()
                                                 .error("Internal serval error")
                                                 .message(e.getMessage())
                                                 .build();
        return new ResponseEntity<>(new ApiResponse<>(errorResponse),HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<?>> ExceptionHandler(Exception e){
        ErrorResponse errorResponse=ErrorResponse.builder()
                                                 .error("Internal serval error")
                                                 .message(e.getMessage())
                                                 .build();
        return new ResponseEntity<>(new ApiResponse<>(errorResponse),HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(UsernameNotFoundException.class)
    public ResponseEntity<ApiResponse<?>> userNotFoundHandler(UsernameNotFoundException e){
        ErrorResponse errorResponse=ErrorResponse.builder()
                                                 .error("User not found")
                                                 .message(e.getMessage())
                                                 .build();
        return new ResponseEntity<>(new ApiResponse<>(errorResponse),HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ImageUploadFailedException.class)
    public ResponseEntity<ApiResponse<?>> uploadingImageFailed(ImageUploadFailedException e){
        ErrorResponse errorResponse=ErrorResponse.builder()
                                                 .error("Failed to upload image")
                                                 .message(e.getMessage())
                                                 .build();
        return new ResponseEntity<>(new ApiResponse<>(errorResponse),HttpStatus.INTERNAL_SERVER_ERROR);
    }


    @ExceptionHandler(IncorrectOtpException.class)
    public ResponseEntity<ApiResponse<?>> OtpIncorrect(IncorrectOtpException e){
        ErrorResponse errorResponse=ErrorResponse.builder()
        .error("OTP is Incorrect")
        .message(e.getMessage())
        .build();
            return new ResponseEntity<>(new ApiResponse<>(errorResponse),HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

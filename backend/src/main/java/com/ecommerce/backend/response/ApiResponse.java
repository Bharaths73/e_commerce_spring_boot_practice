package com.ecommerce.backend.response;

import java.time.LocalDateTime;

import com.ecommerce.backend.Exception.ErrorResponse;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
public class ApiResponse<T> {
    
    @JsonFormat(pattern = "hh:mm:ss dd-MM-yyyy")
    private LocalDateTime timeStamp;
    private T data;
    private ErrorResponse error;

    public ApiResponse(){
        this.timeStamp=LocalDateTime.now();
    }

    public ApiResponse(T data) {
        this();
        this.data = data;
    }

    public ApiResponse(ErrorResponse error) {
        this();
        this.error = error;
    }

    

}

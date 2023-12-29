package com.course_management.advice;


import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ProblemDetail;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.HttpClientErrorException;

@RestControllerAdvice
public class CustomExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ProblemDetail handleSecurityException(Exception exception) {
        ProblemDetail errorResponse = null;
        if(exception instanceof BadCredentialsException){
            errorResponse = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(401), exception.getMessage());
            errorResponse.setProperty("reason", "Sai tài khoản hoặc mật khẩu. ");
        }
        if(exception instanceof UserAlreadyExistsException){
            errorResponse = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(409), exception.getMessage());
            errorResponse.setProperty("reason", "Tên tài khoản đã tồn tại");
        }
        if(exception instanceof AccessDeniedException){
            errorResponse = ProblemDetail.forStatusAndDetail(HttpStatusCode.valueOf(403), exception.getMessage());
            errorResponse.setProperty("reason", "Authorization Failed");

        }
        return errorResponse;
    }
}

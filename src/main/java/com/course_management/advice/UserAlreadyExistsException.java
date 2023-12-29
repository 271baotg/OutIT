package com.course_management.advice;

public class UserAlreadyExistsException extends RuntimeException{
    public UserAlreadyExistsException(String username) {
        super("Tên tài khoản " + username + " đã được sử dụng");
    }

}

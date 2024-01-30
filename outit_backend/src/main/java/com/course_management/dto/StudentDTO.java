package com.course_management.dto;

import jakarta.persistence.Column;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StudentDTO {
    String username;
    String fullName;
    String email;
    String className;
}

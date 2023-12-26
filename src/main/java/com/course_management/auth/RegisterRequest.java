package com.course_management.auth;


import com.course_management.dto.TargetDTO;
import com.course_management.model.Target;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
    private String username;
    private String fullName;
    private String email;
    private String password;
    private String className;
    private List<TargetDTO> targetList;
}

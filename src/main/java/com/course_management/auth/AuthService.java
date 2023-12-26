package com.course_management.auth;
import com.course_management.model.Role;
import com.course_management.model.Student;
import com.course_management.repository.RolesRepository;
import com.course_management.repository.StudentRepository;
import com.course_management.security.JwtServices;
import com.course_management.services.StudentService;
import com.course_management.services.TargetServiceImpl;
import lombok.AllArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.sql.SQLIntegrityConstraintViolationException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Set;

@Service
@AllArgsConstructor
public class AuthService {

    private final JwtServices jwtServices;
    private final StudentRepository studentRepository;
    private final UserDetailsService service;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final RolesRepository rolesRepository;
    private final TargetServiceImpl targetService;
    public AuthResponse register(RegisterRequest request) {
        String raw_password = request.getPassword();
        Student student = new Student(request.getUsername(),
                passwordEncoder.encode(raw_password),
                request.getFullName(),
                request.getEmail(),
                request.getClassName());
        if (studentRepository.findStudentByUsername(request.getUsername()).isPresent()) {
            return new AuthResponse("User exist");
        }

        Set<Role> roleDefault = new HashSet<>();
        Role userRole = rolesRepository.findRoleByName("user").get();
        roleDefault.add(userRole);
        student.setRoles(roleDefault);


        Student savedStudent = studentRepository.save(student);
        targetService.updateTarget(savedStudent.getUsername(),request.getTargetList());
        return new AuthResponse(jwtServices.generateToken(student));
    }


    public AuthResponse login(LoginRequest request){
        Authentication authToken = new UsernamePasswordAuthenticationToken(request.getUsername(),request.getPassword());
        authenticationManager.authenticate(authToken);
        UserDetails student = service.loadUserByUsername(request.getUsername());
        return new AuthResponse(jwtServices.generateToken(student));
    }



}

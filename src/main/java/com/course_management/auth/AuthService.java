package com.course_management.auth;
import com.course_management.model.Student;
import com.course_management.repository.StudentRepository;
import com.course_management.security.JwtServices;
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

@Service
@AllArgsConstructor
public class AuthService {

    private final JwtServices jwtServices;
    private final StudentRepository studentRepository;
    private final UserDetailsService service;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;

    public AuthResponse register(RegisterRequest request){
        try {
            String raw_password = request.getPassword();
            Student student = new Student(request.getUsername(),
                    passwordEncoder.encode(raw_password),
                    request.getEmail(),
                    request.getFullName(),
                    request.getClassName());

            studentRepository.save(student);
            return new AuthResponse(jwtServices.generateToken(student));
        }
        catch (DataIntegrityViolationException e){
            throw new DuplicateKeyException("User name found");
    }
    }

    public AuthResponse login(LoginRequest request){
        Authentication authToken = new UsernamePasswordAuthenticationToken(request.getUsername(),request.getPassword());
        authenticationManager.authenticate(authToken);
        UserDetails student = service.loadUserByUsername(request.getUsername());
        return new AuthResponse(jwtServices.generateToken(student));
    }



}

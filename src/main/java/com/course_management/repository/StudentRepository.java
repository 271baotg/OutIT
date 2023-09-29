package com.course_management.repository;
import com.course_management.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student,Integer> {
    Optional<Student> findStudentByUsername(String username);
}

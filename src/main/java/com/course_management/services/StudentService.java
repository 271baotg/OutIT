package com.course_management.services;

import com.course_management.dto.StudentDTO;
import com.course_management.dto.TargetDTO;
import com.course_management.dto.TermDTO;
import com.course_management.model.Enrollment;
import com.course_management.model.Student;
import com.course_management.model.Target;

import java.util.List;
import java.util.Optional;

public interface StudentService {
    List<Student> findAll();
    Student findById(int id);

    StudentDTO findByUsername(String username);

    void deleteById(int id);
    Student update(Student student);
    Student create(Student student);

    List<Enrollment> updateEnrollByTerm(String username, Integer term, List<Enrollment> enrollmentList);

    List<Enrollment> findEnrollmentByTerm(String username, int term);

    List<TermDTO> findAllTerm(String username);

    List<Enrollment> getAllEnrollment(String username);

    Optional<List<TargetDTO>> getAllTarget(String username);
 }

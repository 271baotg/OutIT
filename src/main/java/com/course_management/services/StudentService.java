package com.course_management.services;

import com.course_management.dto.TermDTO;
import com.course_management.model.Course;
import com.course_management.model.Enrollment;
import com.course_management.model.Student;
import org.springframework.stereotype.Service;

import java.util.List;

public interface StudentService {
    List<Student> findAll();
    Student findById(int id);

    void deleteById(int id);
    Student update(Student student);
    Student create(Student student);

    List<Enrollment> updateEnrollByTerm(String username, Integer term, List<Enrollment> enrollmentList);

    List<Enrollment> findEnrollmentByTerm(String username, int term);

    List<TermDTO> findAllTerm(String username);

    List<Enrollment> getAllEnrollment(String username);
}

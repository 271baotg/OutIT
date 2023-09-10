package com.course_management.services;

import com.course_management.model.Student;
import org.springframework.stereotype.Service;

import java.util.List;

public interface StudentService {
    List<Student> findAll();
    Student findById(int id);

    void deleteById(int id);
    Student update(Student student);
    Student create(Student student);
}

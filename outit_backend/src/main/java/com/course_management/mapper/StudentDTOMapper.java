package com.course_management.mapper;

import com.course_management.dto.StudentDTO;
import com.course_management.model.Student;
import org.springframework.stereotype.Service;

import java.util.function.Function;


@Service
public class StudentDTOMapper implements Function<Student, StudentDTO> {


    @Override
    public StudentDTO apply(Student student) {
        return new StudentDTO(student.getUsername(),
                student.getFullName(),
                student.getEmail(),
                student.getClassName());
    }
}

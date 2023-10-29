package com.course_management.controller;


import com.course_management.model.Enrollment;
import com.course_management.model.Student;
import com.course_management.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class StudentController {

    private final StudentService studentService;

    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping("students")
    public List<Student> findAllStudent(){
        return studentService.findAll();
    }
    @GetMapping("students/{id}")
    public Student findStudentById(@PathVariable int id){
        return studentService.findById(id);
    }

    @PutMapping("students")
    public Student updateStudent(@RequestBody Student student){
        return studentService.update(student);
    }

    @PostMapping("students")
    public Student createStudent(@RequestBody Student student){
        return studentService.create(student);
    }

    @DeleteMapping("students/{id}")
    public void deleteById(@PathVariable int id){
        studentService.deleteById(id);
    }

    @PutMapping("students/enroll/{username}")
    public Student updateEnrollment(@PathVariable String username, @RequestBody List<Enrollment> enrollmentList){
        return studentService.updateEnroll(username,enrollmentList);
    }
}

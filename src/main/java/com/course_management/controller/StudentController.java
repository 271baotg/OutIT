package com.course_management.controller;


import com.course_management.dto.TermDTO;
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

    @PutMapping("enroll/{username}")
    public Student updateEnrollment(@PathVariable String username, @RequestBody List<Enrollment> enrollmentList){
        return studentService.updateEnroll(username,enrollmentList);
    }

    @GetMapping("enroll/{username}")
    public List<Enrollment> getEnrollmentByTerm(@PathVariable(value = "username") String username, @RequestParam(value = "term") Integer term){
        return studentService.findEnrollmentByTerm(username,term);
    }

    @GetMapping("enroll/terms/{username}")
    public List<TermDTO> getAllTerm(@PathVariable(value = "username") String username){
        List<TermDTO> listTerm =  studentService.findAllTerm(username);
        return listTerm;
    }

}

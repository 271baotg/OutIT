package com.course_management.controller;


import com.course_management.dto.StudentDTO;
import com.course_management.dto.TargetDTO;
import com.course_management.dto.TermDTO;
import com.course_management.model.Enrollment;
import com.course_management.model.Student;
import com.course_management.model.Target;
import com.course_management.services.StudentService;
import com.course_management.services.TargetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@RestController
public class StudentController {

    private final StudentService studentService;

    private final TargetService targetService;
    public StudentController(StudentService studentService, TargetService targetService) {
        this.studentService = studentService;
        this.targetService = targetService;
    }

    @GetMapping("students")
    public List<Student> findAllStudent(){
        return studentService.findAll();
    }
    @GetMapping("students/{id}")
    public Student findStudentById(@PathVariable int id){
        return studentService.findById(id);
    }

    @GetMapping("students/detail")
    public StudentDTO findStudentByUsername(@RequestParam(value = "username") String username){
        return studentService.findByUsername(username);
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

    @PutMapping("enroll")
    public List<Enrollment> updateEnrollment(@RequestParam(name = "username") String username,@RequestParam(name = "term") Integer term, @RequestBody List<Enrollment> enrollmentList){
        return studentService.updateEnrollByTerm(username,term,enrollmentList);
    }

    @GetMapping("enroll/{username}")
    public List<Enrollment> getEnrollmentByTerm(@PathVariable(value = "username") String username, @RequestParam(value = "term") Integer term){
        return studentService.findEnrollmentByTerm(username,term);
    }

    @GetMapping("enroll")
    public List<Enrollment> getAllEnrollment(@RequestParam(value = "username") String username) {
        return studentService.getAllEnrollment(username);
    }

    @GetMapping("enroll/terms/{username}")
    public List<TermDTO> getAllTerm(@PathVariable(value = "username") String username){
        List<TermDTO> listTerm =  studentService.findAllTerm(username);
        return listTerm;
    }

    @DeleteMapping("enroll")
    public void deleteTerm(@RequestParam(name = "username") String username,
                           @RequestParam(name = "term") Integer term)
    {
        studentService.deleteByStudentAndTerm(username,term);
    }

    @GetMapping("students/target")
    public List<TargetDTO> getAllTarget(@RequestParam(value = "username") String username){
        if(studentService.getAllTarget(username).isPresent())
            return studentService.getAllTarget(username).get();
        else return Collections.emptyList();
    }


    @PutMapping("student/target")
    public List<TargetDTO> updateTarget(@RequestParam(value = "username") String username, @RequestBody List<TargetDTO> dtoList){
        targetService.updateTarget(username,dtoList);
        if(studentService.getAllTarget(username).isPresent())
            return studentService.getAllTarget(username).get();
        else return Collections.emptyList();
    }
}

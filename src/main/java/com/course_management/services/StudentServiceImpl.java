package com.course_management.services;

import com.course_management.model.Enrollment;
import com.course_management.model.Student;
import com.course_management.repository.StudentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentServiceImpl implements StudentService{

    private final StudentRepository studentRepository;

    public StudentServiceImpl(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public List<Student> findAll() {
        return studentRepository.findAll();
    }

    @Override
    public Student findById(int id) {
        Student student = new Student();
        if(studentRepository.findById(id).isPresent())
            student = studentRepository.findById(id).get();
        return student;
    }


    @Override
    public void deleteById(int id) {
        studentRepository.deleteById(id);
    }

    @Override
    public Student update(Student student) {
        return studentRepository.save(student);
    }

    @Override
    public Student create(Student student) {
        student.setId(0);
        return studentRepository.save(student);
    }

    @Override
    public Student updateEnroll(String username, List<Enrollment> enrollmentList) {
        Student student = new Student();
        if(studentRepository.findStudentByUsername(username).isPresent()){
            student = studentRepository.findStudentByUsername(username).get();
        }
        for(Enrollment enrol: enrollmentList){
            student.addEnrollment(enrol);
        }
        return studentRepository.save(student);
    }
}

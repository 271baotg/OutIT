package com.course_management.services;

import com.course_management.dto.TermDTO;
import com.course_management.model.Enrollment;
import com.course_management.model.Student;
import com.course_management.repository.EnrollmentRepository;
import com.course_management.repository.StudentRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class StudentServiceImpl implements StudentService{

    private final EnrollmentRepository enrollmentRepository;

    private final StudentRepository studentRepository;

    public StudentServiceImpl(EnrollmentRepository enrollmentRepository, StudentRepository studentRepository) {
        this.enrollmentRepository = enrollmentRepository;
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
    @Transactional
    public List<Enrollment> updateEnrollByTerm(String username, Integer term, List<Enrollment> enrollmentList) {
        Student student = new Student();
        if(studentRepository.findStudentByUsername(username).isPresent()){
            student = studentRepository.findStudentByUsername(username).get();
            enrollmentRepository.deleteAllByStudentAndTerm(student,term);
        }
        for(Enrollment enroll: enrollmentList){
            student.addEnrollment(enroll);
        }
        return studentRepository.save(student).getEnrollmentList();

    }

    @Override
    public List<Enrollment> findEnrollmentByTerm(String username, int term) {
        if(studentRepository.findStudentByUsername(username).isPresent()) {
            Student student = studentRepository.findStudentByUsername(username).get();
            List<Enrollment> list = student.getEnrollmentList();
            return list.stream().filter(enrollment -> enrollment.getTerm()==term).collect(Collectors.toList());
        }
        return Collections.emptyList(); // Return an empty list if the student is not found.
    }

    @Override
    public List<TermDTO> findAllTerm(String username) {
        List<TermDTO> result = new ArrayList<>();
        List<Integer> listTerm;
        if(studentRepository.findAllTerm(username).isPresent())
        {
             listTerm = studentRepository.findAllTerm(username).get();
             for(int term : listTerm){
                 TermDTO temp = new TermDTO(term,enrollmentRepository.getTotal(username,term));
                 result.add(temp);
             }
             return result;
        }
        else return Collections.emptyList();
    }

    @Override
    public List<Enrollment> getAllEnrollment(String username) {
        Student student = new Student();
        if(studentRepository.findStudentByUsername(username).isPresent()){
            student = studentRepository.findStudentByUsername(username).get();
        }
        return student.getEnrollmentList();
    }


}

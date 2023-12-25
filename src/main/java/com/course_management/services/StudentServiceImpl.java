package com.course_management.services;

import com.course_management.dto.StudentDTO;
import com.course_management.dto.TargetDTO;
import com.course_management.dto.TermDTO;
import com.course_management.mapper.StudentDTOMapper;
import com.course_management.mapper.TargetDTOMapper;
import com.course_management.model.Enrollment;
import com.course_management.model.Student;
import com.course_management.model.Target;
import com.course_management.repository.EnrollmentRepository;
import com.course_management.repository.StudentRepository;
import com.course_management.repository.TargetRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import static java.util.stream.Collectors.toList;
@Service
public class StudentServiceImpl implements StudentService{

    private final EnrollmentRepository enrollmentRepository;

    private final StudentDTOMapper studentDTOMapper;

    private final StudentRepository studentRepository;
    private final TargetRepository targetRepository;
    private final TargetDTOMapper targetDTOMapper;

    public StudentServiceImpl(EnrollmentRepository enrollmentRepository, StudentDTOMapper studentDTOMapper, StudentRepository studentRepository, TargetRepository targetRepository, TargetDTOMapper targetDTOMapper) {
        this.enrollmentRepository = enrollmentRepository;
        this.studentDTOMapper = studentDTOMapper;
        this.studentRepository = studentRepository;
        this.targetRepository = targetRepository;
        this.targetDTOMapper = targetDTOMapper;
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
    public StudentDTO findByUsername(String username) {
        return studentDTOMapper.apply(studentRepository.findStudentByUsername(username).get());
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
            return list.stream().filter(enrollment -> enrollment.getTerm()==term).collect(toList());
        }
        return Collections.emptyList(); // Return an empty list if the student is not found.
    }

    @Override
    public List<TermDTO> findAllTerm(String username) {
        List<TermDTO> result = new ArrayList<>();
        List<Integer> listTerm;
        List<String> listType;
        Student student;
        if(studentRepository.findStudentByUsername(username).isPresent())
        {
            student = studentRepository.findStudentByUsername(username).get();
            listTerm = studentRepository.findAllTerm(student.getId()).get();
             for(int term : listTerm){
                 listType = enrollmentRepository.getTypeByTerm(term);
                 TermDTO temp = new TermDTO(term,enrollmentRepository.getTotal(username,term),listType);
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

    @Override
    public Optional<List<TargetDTO>> getAllTarget(String username) {
        Student student = studentRepository.findStudentByUsername(username).get();
        Optional<List<Target>> list = targetRepository.findAllByStudent(student);
        if(list.isPresent()) {
            List<Target> targetList = list.get();
            List<TargetDTO> result = targetList.stream()
                    .map(targetDTOMapper)
                    .toList();
            return Optional.of(result);
        }

        return Optional.of(Collections.emptyList());
    }


}

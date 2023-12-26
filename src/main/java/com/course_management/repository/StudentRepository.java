package com.course_management.repository;
import com.course_management.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student,Integer> {
    Optional<Student> findStudentByUsername(String username);

    @Query(value = "select distinct term from enrollment where student_id = :id" , nativeQuery = true)
    Optional<List<Integer>> findAllTerm(int id);

}

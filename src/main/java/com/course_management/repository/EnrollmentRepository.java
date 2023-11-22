package com.course_management.repository;

import com.course_management.dto.TermDTO;
import com.course_management.model.Enrollment;
import com.course_management.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface EnrollmentRepository extends JpaRepository<Enrollment,Integer> {

    @Query(value = "select sum(total) from enrollment, student where username = :username and term=:term", nativeQuery = true)
    int getTotal(String username, Integer term);

    @Query(value = "select sum(total) from enrollment, student where username = :username and type=:type", nativeQuery = true)
    Optional<Integer> getTotalByType(String username, String type);

    void deleteAllByStudentAndTerm(Student student,Integer term);
}

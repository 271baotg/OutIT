package com.course_management.repository;

import com.course_management.dto.TermDTO;
import com.course_management.model.Enrollment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface EnrollmentRepository extends JpaRepository<Enrollment,Integer> {

    @Query(value = "select sum(total) from enrollment, student where username = :username and term=:term", nativeQuery = true)
    int getTotal(String username, Integer term);
}
package com.course_management.repository;

import com.course_management.dto.TermDTO;
import com.course_management.model.Enrollment;
import com.course_management.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface EnrollmentRepository extends JpaRepository<Enrollment,Integer> {

    @Query(value = "select sum(total) from enrollment where student_id = :id and term=:term", nativeQuery = true)
    int getTotal(Integer id, Integer term);

    @Query(value = "select sum(total) from enrollment where student_id = :id and type=:type", nativeQuery = true)
    Optional<Integer> getTotalByType(Integer id, String type);

    @Query(value = "select distinct type from enrollment where term = :term and student_id = :id", nativeQuery = true)
    List<String> getTypeByTerm(Integer id, Integer term);

    void deleteAllByStudentAndTerm(Student student,Integer term);
}

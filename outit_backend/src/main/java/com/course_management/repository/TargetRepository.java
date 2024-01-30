package com.course_management.repository;

import com.course_management.model.Student;
import com.course_management.model.Target;
import com.course_management.model.TargetPK;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TargetRepository extends JpaRepository<Target, TargetPK> {

    @Query(value = "SELECT * FROM target where studentID = :id", nativeQuery = true)
    Optional<List<Target>> findAllByStudentID(Integer id);
}

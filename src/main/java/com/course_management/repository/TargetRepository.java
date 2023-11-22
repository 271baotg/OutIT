package com.course_management.repository;

import com.course_management.model.Student;
import com.course_management.model.Target;
import com.course_management.model.TargetPK;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TargetRepository extends JpaRepository<Target, TargetPK> {

    Optional<List<Target>> findAllByStudent(Student student);
}

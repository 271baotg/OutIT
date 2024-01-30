package com.course_management.repository;

import com.course_management.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface CourseRepository extends JpaRepository<Course,Integer> {
    @Query(value = "SELECT * FROM course where match(code,name) against(:query in natural language mode)", nativeQuery = true)
    List<Course> ftsByQuery(String query);
}

package com.course_management.controller;

import com.course_management.model.Course;
import com.course_management.services.CourseService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/course")
public class CourseController {
    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }


    @GetMapping()
    public List<Course> loadAllCourse(){
        return courseService.findAll();
    }

    @GetMapping("search")
    public List<Course> searchCourse(@RequestParam("query") String query){
        return courseService.ftsByQuery(query);
    }
}

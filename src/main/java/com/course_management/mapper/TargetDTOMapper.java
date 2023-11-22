package com.course_management.mapper;


import com.course_management.dto.TargetDTO;
import com.course_management.model.Student;
import com.course_management.model.Target;
import com.course_management.repository.EnrollmentRepository;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class TargetDTOMapper implements Function<Target, TargetDTO> {

    private  EnrollmentRepository enrollmentRepository;

    public TargetDTOMapper(EnrollmentRepository enrollmentRepository) {
        this.enrollmentRepository = enrollmentRepository;
    }

    @Override
    public TargetDTO apply(Target target) {
        Student student = target.getStudent();
        int total;
        if(enrollmentRepository.getTotalByType(student.getUsername(), target.getType()).isPresent())
        {
            total = enrollmentRepository.getTotalByType(student.getUsername(), target.getType()).get();
        }
        else total = 0;
        return new TargetDTO(target.getType(), target.getGoal(),total);
    }
}

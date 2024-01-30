package com.course_management.dto;


import com.course_management.model.Student;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TargetDTO {
    private String type;
    private int goal;
    private int total;

}

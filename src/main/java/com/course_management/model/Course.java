package com.course_management.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "course")
@AllArgsConstructor
@NoArgsConstructor
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private int id;

    @Column
    private String code;
    @Column
    private String name;
    @Column
    private String unit;
    @Column
    private String type;
    @Column
    private int prac;
    @Column
    private int theo;
    @Column
    private int total;


}

package com.course_management.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "target")
@NoArgsConstructor
@IdClass(TargetPK.class)
public class Target {

    @Id
    @JsonBackReference
    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @JoinColumn(name = "studentID")
    private Student student;

    @Id
    @Column(name = "type")
    private String type;

    @Column(name = "goal")
    private int goal;

}

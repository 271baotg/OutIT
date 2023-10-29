package com.course_management.model;


import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.Cascade;

@Entity
@Table(name = "enrollment")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class Enrollment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @ManyToOne(cascade = {CascadeType.MERGE, CascadeType.PERSIST, CascadeType.REFRESH, CascadeType.DETACH})
    @JoinColumn(name = "student_id")
    @JsonBackReference
    private Student student;

    @Column(name = "course_code")
    private String course_code;

    @Column(name = "type")
    private String type;

    @Column(name="total")
    private int total;


    @Column(name = "term")
    private int term;

    public Enrollment(String course_code, String type, int total, int term) {
        this.course_code = course_code;
        this.type = type;
        this.total = total;
        this.term = term;
    }

    @Override
    public String toString() {
        return "Enrollment{" +
                "id=" + id +
                ", course_code='" + course_code + '\'' +
                ", type='" + type + '\'' +
                ", total=" + total +
                ", term=" + term +
                '}';
    }
}

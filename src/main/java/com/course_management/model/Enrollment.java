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

    @Column(name = "code")
    private String code;

    @Column(name="name")
    private String name;

    @Column(name = "type")
    private String type;

    @Column(name="total")
    private int total;


    @Column(name = "term")
    private int term;

    public Enrollment(String code, String name, String type, int total, int term) {
        this.code = code;
        this.name = name;
        this.type = type;
        this.total = total;
        this.term = term;
    }

    @Override
    public String toString() {
        return "Enrollment{" +
                "id=" + id +
                ", code='" + code + '\'' +
                ", name='" + name + '\'' +
                ", type='" + type + '\'' +
                ", total=" + total +
                ", term=" + term +
                '}';
    }
}

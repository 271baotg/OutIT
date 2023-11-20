package com.course_management.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name = "target")
@NoArgsConstructor
@Builder
public class Target {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne(mappedBy = "target")
    private Student student;
    private int CN;
    private int CSN;
    private int ĐC;
    private int BT;
    private int CĐTN;
    private int ĐA;
    private int CNTC;
    private int TTTN;
    private int KLTN;
    private int CNCS;
    private int TN;
    private int TT;
    private int CSNN;
    private int NN;
    private int QP;
    private int TC;
    private int CS;

    @Builder
    public Target(Long id, Student student, int CN, int CSN, int ĐC, int BT, int CĐTN, int ĐA, int CNTC, int TTTN, int KLTN, int CNCS, int TN, int TT, int CSNN, int NN, int QP, int TC, int CS) {
        this.id = id;
        this.student = student;
        this.CN = CN;
        this.CSN = CSN;
        this.ĐC = ĐC;
        this.BT = BT;
        this.CĐTN = CĐTN;
        this.ĐA = ĐA;
        this.CNTC = CNTC;
        this.TTTN = TTTN;
        this.KLTN = KLTN;
        this.CNCS = CNCS;
        this.TN = TN;
        this.TT = TT;
        this.CSNN = CSNN;
        this.NN = NN;
        this.QP = QP;
        this.TC = TC;
        this.CS = CS;
    }
}

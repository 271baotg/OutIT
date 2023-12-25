package com.course_management.services;

import com.course_management.dto.TargetDTO;
import com.course_management.mapper.TargetDTOMapper;
import com.course_management.model.Student;
import com.course_management.model.Target;
import com.course_management.repository.StudentRepository;
import com.course_management.repository.TargetRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TargetServiceImpl implements TargetService{

    private final StudentRepository studentRepository;
    private final TargetRepository targetRepository;

    private final TargetDTOMapper targetDTOMapper;

    public TargetServiceImpl(StudentRepository studentRepository, TargetRepository targetRepository, TargetDTOMapper targetDTOMapper) {
        this.studentRepository = studentRepository;
        this.targetRepository = targetRepository;
        this.targetDTOMapper = targetDTOMapper;
    }

    @Override
    public List<Target> updateTarget(String username, List<TargetDTO> listTargetDTO) {
        List<Target> listTarget = listTargetDTO.stream()
                .filter(targetDTO -> targetDTO.getGoal() != 0)
                .map(targetDTO -> {

                        Student student = studentRepository.findStudentByUsername(username).get();
                        return new Target(student, targetDTO.getType(), targetDTO.getGoal());

                })
                .toList();

        return targetRepository.saveAll(listTarget);
    }
}

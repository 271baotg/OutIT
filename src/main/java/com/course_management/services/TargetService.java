package com.course_management.services;

import com.course_management.dto.TargetDTO;
import com.course_management.model.Target;

import java.util.List;

public interface TargetService {
    List<Target> updateTarget(String username, List<TargetDTO> listTargetDTO);
}

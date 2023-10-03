package com.course_management.repository;

import com.course_management.model.Role;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RolesRepository extends JpaRepository<Role,Integer> {

    Optional<Role> findRoleByName(String name);

}

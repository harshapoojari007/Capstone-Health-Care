package com.graymatter.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.graymatter.entities.User;

public interface UserRepository extends JpaRepository<User, Integer>{

}

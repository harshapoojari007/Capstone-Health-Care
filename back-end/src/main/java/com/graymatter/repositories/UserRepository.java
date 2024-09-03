package com.graymatter.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.graymatter.entities.User;
import java.util.List;


public interface UserRepository extends JpaRepository<User, Integer>{
	User findByUsername(String userName);
}

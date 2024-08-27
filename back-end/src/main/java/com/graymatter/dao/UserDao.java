package com.graymatter.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.graymatter.repositories.UserRepository;

@Repository
public class UserDao {

	@Autowired
	UserRepository repo;
}

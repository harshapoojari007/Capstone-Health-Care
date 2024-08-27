package com.graymatter.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.graymatter.repositories.AdminRepository;

@Repository
public class AdminDao {

	@Autowired
	AdminRepository repo;
}

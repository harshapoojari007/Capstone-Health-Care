package com.graymatter.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.graymatter.repositories.TestResultRepository;

@Repository
public class TestResultDao {

	@Autowired
	TestResultRepository repo;
	
}

package com.graymatter.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.graymatter.repositories.PatientRepository;
@Repository
public class PatientDao {

	@Autowired
	PatientRepository repo;
}

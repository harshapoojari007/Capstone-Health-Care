package com.graymatter.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.graymatter.repositories.CenterAdministratorRepository;
@Repository
public class CenterAdministatorDao {

	@Autowired
	CenterAdministratorRepository repo;
}

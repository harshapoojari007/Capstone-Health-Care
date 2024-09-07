package com.graymatter.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.graymatter.entities.CenterAdministrator;

public interface CenterAdministratorRepository extends JpaRepository<CenterAdministrator,Integer>{

	
	CenterAdministrator findByUserId(int userId);

}

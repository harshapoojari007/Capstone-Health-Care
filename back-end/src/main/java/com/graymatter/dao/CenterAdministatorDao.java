package com.graymatter.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.graymatter.entities.CenterAdministrator;
import com.graymatter.repositories.CenterAdministratorRepository;
@Repository
public class CenterAdministatorDao {

	@Autowired
	CenterAdministratorRepository repo;

	public CenterAdministrator addCenterAdministrator(CenterAdministrator centerAdministrator) {
		return repo.save(centerAdministrator);
	}

	public List<CenterAdministrator> getAllCenterAdministrators() {
		return repo.findAll();
	}

	public CenterAdministrator getCenterAdministratorById(int centerAdministratorId) {
		return repo.findById(centerAdministratorId).get();
	}

	public void deleteCenterAdministrator(int centerAdminId) {
		repo.deleteById(centerAdminId);
		
	}

	public CenterAdministrator updateCenterAdministrator(CenterAdministrator mapToCenterAdministrator) {
		// TODO Auto-generated method stub
		return null;
	}
}

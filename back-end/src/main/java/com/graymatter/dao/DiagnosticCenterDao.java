package com.graymatter.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.graymatter.entities.DiagnosticCenter;
import com.graymatter.repositories.DiagnosticCenterRepository;
@Repository
public class DiagnosticCenterDao {

	@Autowired
	DiagnosticCenterRepository repo;

	public List<DiagnosticCenter> getAllDiagnosticCenters() {
		// TODO Auto-generated method stub
		return repo.findAll();
	}

	public DiagnosticCenter addDiagnosticCenter(DiagnosticCenter diagnosticCenter) {
		return repo.save(diagnosticCenter);
	}

	public DiagnosticCenter getDiagnosticCenterById(int diagnosticCenterId) {
		// TODO Auto-generated method stub
		return repo.findById(diagnosticCenterId).get();
	}

	public DiagnosticCenter updateDiagnosticCenter(DiagnosticCenter diagnosticCenter) {
		// TODO Auto-generated method stub
		return repo.save(diagnosticCenter);
	}
	
	
}

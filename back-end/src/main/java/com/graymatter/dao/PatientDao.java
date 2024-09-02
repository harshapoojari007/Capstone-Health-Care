package com.graymatter.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.graymatter.dto.PatientDto;
import com.graymatter.entities.Patient;
import com.graymatter.entities.TestResult;
import com.graymatter.repositories.PatientRepository;
@Repository
public class PatientDao {

	@Autowired
	PatientRepository repo;

	public List<TestResult> getAllTestResults() {
		// TODO Auto-generated method stub
		return null;
	}

	public Patient getPatientByUsername(String patientUsername) {
		// TODO Auto-generated method stub
		return null;
	}

	public PatientDto getTestResultsById(int testResultId) {
		// TODO Auto-generated method stub
		return null;
	}
}

package com.graymatter.dao;

import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Repository;

import com.graymatter.entities.Patient;
import com.graymatter.entities.TestResult;
import com.graymatter.exceptions.IdNotFoundException;
import com.graymatter.repositories.PatientRepository;
import com.graymatter.repositories.TestResultRepository;
@Repository
public class PatientDao {

	@Autowired
	PatientRepository patientRepo;
	
	@Autowired
	TestResultRepository testResultRepo;

	public List<TestResult> getAllTestResults() {
		return testResultRepo.findAll();
		}

	public Patient getPatientByUsername(String patientUsername) {
		
		return patientRepo.findByUsername(patientUsername);
	}

	public boolean isPresent(int id) {
		Patient p= patientRepo.findById(id).get();
		return p!=null;
	}

	public Patient addPatient(Patient patient) {
		return patientRepo.save(patient);
		
	}

	public List<TestResult> getTestResultByUserName(String patientUserName) {
		return testResultRepo.findAllTestResultsByPatientUsername(patientUserName);
	}

	public List<Patient> getAllPatients() {
		return patientRepo.findAll();
		}

	public Patient getPatientById(int id) throws IdNotFoundException {
		return patientRepo.findById(id).orElseThrow(()->new IdNotFoundException("patient id: "+id+" is not present"));
	}

	public Patient deletePatientById(int id) throws IdNotFoundException {
		Patient p= patientRepo.findById(id).orElseThrow(()->new IdNotFoundException("patient id: "+id+" is not present"));
		patientRepo.deleteById(id);
		return p;
	}

}

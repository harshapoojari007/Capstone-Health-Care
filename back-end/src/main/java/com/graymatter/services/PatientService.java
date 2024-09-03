package com.graymatter.services;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.graymatter.dao.PatientDao;
import com.graymatter.dto.PatientDto;
import com.graymatter.dto.PatientMapper;
import com.graymatter.dto.TestResultDto;
import com.graymatter.dto.TestResultMapper;
import com.graymatter.entities.Patient;
import com.graymatter.entities.TestResult;
import com.graymatter.exceptions.IdNotFoundException;

@Service
public class PatientService implements PatientServiceInterface{
	@Autowired
	PatientDao dao;
	
	@Autowired
	PatientMapper pMapper;

	@Autowired
	TestResultMapper tMapper;
	@Override
	public ResponseEntity<?> registerPatient(PatientDto patient) {
		PatientDto output=pMapper.mapToPatientDto(dao.addPatient(pMapper.mapToPatient(patient)));
		Map<String,Object> map= new HashMap<>();
		 map.put("status", 10);
			map.put("data",output);
			map.put("message", "Patient added successfully");
			return new ResponseEntity<>(map,HttpStatus.CREATED);

	}

	@Override
	public ResponseEntity<?> updatePatient(int id,PatientDto patient) {
		Map<String,Object> map= new HashMap<>();
		if(dao.isPresent(id)) {
		 Patient p= pMapper.mapToPatient(patient);
		 p.setId(id);
		 Patient updatedPatient=  dao.addPatient(p);
		PatientDto output=pMapper.mapToPatientDto(updatedPatient);
		 map.put("status", 10);
			map.put("data",output);
			map.put("message", "Product updated successfully");
			return new ResponseEntity<>(map,HttpStatus.CREATED);
			}else {
				map.put("status",40);
				map.put("data", "No products to display");
				return new ResponseEntity<>(map,HttpStatus.NOT_FOUND);
			}
	}

	@Override
	public ResponseEntity<?> viewPatientByUsername(String patientUsername) {
		PatientDto output= pMapper.mapToPatientDto(dao.getPatientByUsername(patientUsername));
		Map<String,Object> map= new HashMap<>();
		 map.put("status", 10);
			map.put("data",output);
			map.put("message", "Patient fetched successfully");
			return new ResponseEntity<>(map,HttpStatus.CREATED);
	}

	@Override
	public ResponseEntity<?> getAllTestResult(String patientUserName) {
		List<TestResult> output= dao.getTestResultByUserName(patientUserName);
		Map<String,Object> map= new HashMap<>();
		 map.put("status", 10);
			map.put("data",output);
			map.put("message", "Test Results by username fetched successfully");
			return new ResponseEntity<>(map,HttpStatus.CREATED);
	}


	@Override
	public ResponseEntity<?> deletePatientById(int id) throws IdNotFoundException {
		 dao.deletePatientById(id);
		 Map<String,Object> map= new HashMap<>();
		 map.put("status", 10);
		 map.put("message", "Patient of Id"+id+" deleted successfully");
		return new ResponseEntity<>(map,HttpStatus.ACCEPTED);
		 
	}

	@Override
	public ResponseEntity<?> getPatientById(int id) throws IdNotFoundException {
		PatientDto output= pMapper.mapToPatientDto(dao.getPatientById(id));
		Map<String,Object> map= new HashMap<>();
		 map.put("status", 10);
		 map.put("data",output);
		 map.put("message", "Test Results by username fetched successfully");
		return new ResponseEntity<>(map,HttpStatus.CREATED);
	}

	@Override
	public ResponseEntity<?> getAllPatients() {
		List<Patient> p= dao.getAllPatients();
		List<PatientDto> output= p.stream().map((item)->pMapper.mapToPatientDto(item)).collect(Collectors.toList());
		Map<String,Object> map= new HashMap<>();
		 map.put("status", 10);
		 map.put("data",output);
		 map.put("message", "All patients fetched successfully");
		return new ResponseEntity<>(map,HttpStatus.CREATED);
	}

	@Override
	public TestResultDto viewTestResult(int testResultId) {
		// TODO Auto-generated method stub
		return null;
	}

}

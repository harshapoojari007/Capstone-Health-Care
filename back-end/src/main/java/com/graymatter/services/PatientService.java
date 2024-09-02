package com.graymatter.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.graymatter.dao.PatientDao;
import com.graymatter.dto.PatientDto;
import com.graymatter.dto.PatientMapper;
import com.graymatter.dto.TestResultDto;
import com.graymatter.entities.TestResult;

@Service
public class PatientService implements PatientServiceInterface{
	@Autowired
	PatientDao dao;
	
	@Autowired
	PatientMapper mapper;

	@Override
	public PatientDto registerPatient(PatientDto patient) {
		return mapper.mapToPatientDto(dao.addPatient(mapper.mapToPatient(patient)));
	}

	@Override
	public PatientDto updatePatient(PatientDto patient) {
		return null;
	}

	@Override
	public PatientDto viewPatientByUsername(String patientUsername) {
		return mapper.mapToPatientDto(dao.getPatientByUsername(patientUsername));
	}

	@Override
	public List<TestResultDto> getAllTestResult(String patientUserName) {
		return null;
	}

	@Override
	public TestResultDto viewTestResultById(int testResultId) {
		return null;
	}

}

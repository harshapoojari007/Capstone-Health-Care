package com.graymatter.services;

import java.util.List;

import com.graymatter.dto.PatientDto;
import com.graymatter.dto.TestResultDto;

public interface PatientServiceInterface {
	public PatientDto registerPatient(PatientDto patient);
	public PatientDto updatePatient(PatientDto patient);
	public List<TestResultDto> getAllTestResult(String patientUserName);
	public TestResultDto viewTestResult(int testResultId);
	PatientDto viewPatientByUsername(String patientUsername);
	TestResultDto viewTestResultById(int testResultId);
	
}

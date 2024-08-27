package com.graymatter.services;

import java.util.List;

import com.graymatter.entities.Patient;
import com.graymatter.entities.TestResult;

public interface TestResultServiceInterface {

	public List<TestResult> getAllTestResults();
	public TestResult addTestResult(TestResult testResult); 
	public TestResult updateTestResult(int id,TestResult testResult);
	public TestResult getTestResultById(int id);
	public void deleteTestResultById(int id);
	public List<TestResult> viewTestResultByPatient(Patient patient);
	
	
	
}

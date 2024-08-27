package com.graymatter.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.graymatter.dao.TestResultDao;
import com.graymatter.entities.Patient;
import com.graymatter.entities.TestResult;

@Service
public class TestResultService implements TestResultServiceInterface{

	@Autowired
	TestResultDao dao;

	@Override
	public List<TestResult> getAllTestResults() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public TestResult addTestResult(TestResult testResult) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public TestResult updateTestResult(int id, TestResult testResult) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public TestResult getTestResultById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteTestResultById(int id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public List<TestResult> viewTestResultByPatient(Patient patient) {
		// TODO Auto-generated method stub
		return null;
	}
	
}

package com.graymatter.services;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.graymatter.dao.DiagnosticTestDao;
import com.graymatter.entities.DiagnosticCenter;
import com.graymatter.entities.DiagnosticTest;

@Service
public class DiagnosticTestService implements DiagnosticTestServiceInterface{

	@Autowired
	 DiagnosticTestDao dao;
	
	@Override
	public List<DiagnosticTest> getAllDiagnosticTest() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public DiagnosticTest addNewDiagnosticTest(DiagnosticTest diagnosticTest) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public DiagnosticTest updateDiagnosticTestDetails(int id, DiagnosticTest diagnosticTest) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public DiagnosticTest getDiagnosticTestById(int id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteDiagnosticTestById(int id) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String getNormalValueOfTest(String testName) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public String getUnitPriceOfTest(String testName) {
		// TODO Auto-generated method stub
		return null;
	}

}

package com.graymatter.services;

import java.util.List;
import java.util.Set;

import com.graymatter.entities.DiagnosticCenter;
import com.graymatter.entities.DiagnosticTest;

public interface DiagnosticTestServiceInterface {
	
	public List<DiagnosticTest> getAllDiagnosticTest();
	public DiagnosticTest addNewDiagnosticTest(DiagnosticTest diagnosticTest);
	public DiagnosticTest updateDiagnosticTestDetails(int id,DiagnosticTest diagnosticTest);
	public DiagnosticTest getDiagnosticTestById(int id);
	public void deleteDiagnosticTestById(int id);
	public String getNormalValueOfTest(String testName);
	public String getUnitPriceOfTest(String testName);
	
	
}

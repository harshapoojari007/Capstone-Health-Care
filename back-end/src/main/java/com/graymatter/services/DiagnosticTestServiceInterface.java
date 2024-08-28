package com.graymatter.services;

import java.util.List;
import java.util.Set;

import org.springframework.http.ResponseEntity;

import com.graymatter.dto.DiagnosticTestDto;
import com.graymatter.entities.DiagnosticCenter;
import com.graymatter.entities.DiagnosticTest;
import com.graymatter.exceptions.IdNotFoundException;

public interface DiagnosticTestServiceInterface {
	
	public ResponseEntity<?>  getAllDiagnosticTest();
	public ResponseEntity<?>  addNewDiagnosticTest(DiagnosticTestDto diagnosticTest);
	public ResponseEntity<?>  updateDiagnosticTestDetails(int id,DiagnosticTestDto diagnosticTest) throws IdNotFoundException;
	public ResponseEntity<?>  getDiagnosticTestById(int id) throws IdNotFoundException;
	public ResponseEntity<?>  deleteDiagnosticTestById(int id) throws IdNotFoundException;
	public ResponseEntity<?>  getNormalValueOfTest(String testName);
	
	public ResponseEntity<?>  getUnitsOfTest(String testName);
	public ResponseEntity<?>  getAllDiagnosticTestDto();
	
	
}


package com.graymatter.dao;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.graymatter.entities.DiagnosticCenter;
import com.graymatter.entities.DiagnosticTest;
import com.graymatter.repositories.DiagnosticTestRepository;
@Repository
public class DiagnosticTestDao {

	@Autowired
	DiagnosticTestRepository repo;
	

	public List<DiagnosticTest> getAllDiagnosticTest(){
		return repo.findAll();
	}
	public DiagnosticTest addNewDiagnosticTest(DiagnosticTest diagnosticTest) {
		return repo.save(diagnosticTest);
	}
	public DiagnosticTest updateDiagnosticTestDetails(int id,DiagnosticTest diagnosticTest) {
		return repo.save(diagnosticTest);
	}
	public DiagnosticTest getDiagnosticTestById(int id) {
		return repo.findById(id).get();
	}
	public void deleteDiagnosticTestById(int id) {
		repo.deleteById(id);
	}
	public String getNormalValueOfTest(String testName) {
		return repo.findByTestName(testName).get(0).getNormalValue();
	}
	public double getPriceOfTest(String testName)
	{
		return repo.findByTestName(testName).get(0).getTestPrice();
	}
	
	
}

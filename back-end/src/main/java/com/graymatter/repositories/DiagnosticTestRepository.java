package com.graymatter.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.graymatter.entities.DiagnosticTest;
import java.util.Set;
import com.graymatter.entities.DiagnosticCenter;




public interface DiagnosticTestRepository extends JpaRepository<DiagnosticTest, Integer>{

	List<DiagnosticTest> findByTestName(String testName);
	

}

package com.graymatter.repositories;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.graymatter.entities.DiagnosticCenter;
import com.graymatter.entities.DiagnosticTest;

public interface DiagnosticCenterRepository extends JpaRepository<DiagnosticCenter, Integer>{
	List<DiagnosticCenter> findByDiagnosticTests(Set<DiagnosticTest> diagnosticTests);

}

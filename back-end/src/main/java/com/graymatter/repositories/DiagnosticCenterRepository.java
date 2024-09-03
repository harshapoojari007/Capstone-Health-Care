package com.graymatter.repositories;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;

import com.graymatter.entities.DiagnosticCenter;
import com.graymatter.entities.DiagnosticTest;

public interface DiagnosticCenterRepository extends JpaRepository<DiagnosticCenter, Integer>{
	List<DiagnosticCenter> findByDiagnosticTests(Set<DiagnosticTest> diagnosticTests);
<<<<<<< HEAD

=======
	
>>>>>>> 27dfb12a60eb88582ecc9ae5c3779c2645c330b8
}

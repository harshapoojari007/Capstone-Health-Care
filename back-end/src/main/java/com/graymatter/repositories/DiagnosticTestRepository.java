package com.graymatter.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.graymatter.entities.DiagnosticTest;

public interface DiagnosticTestRepository extends JpaRepository<DiagnosticTest, Integer>{

}

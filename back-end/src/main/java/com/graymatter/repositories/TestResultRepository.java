package com.graymatter.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.graymatter.entities.TestResult;

public interface TestResultRepository extends JpaRepository<TestResult, Integer>{

}

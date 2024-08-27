package com.graymatter.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.graymatter.repositories.DiagnosticCenterRepository;
@Repository
public class DiagnosticCenterDao {

	@Autowired
	DiagnosticCenterRepository repo;
}

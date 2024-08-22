package com.graymatter.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.graymatter.entities.Patient;

public interface PatientRepository extends JpaRepository<Patient, Integer>{

}

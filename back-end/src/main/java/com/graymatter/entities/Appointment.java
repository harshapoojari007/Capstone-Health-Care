package com.graymatter.entities;

import java.sql.Date;
import java.util.Set;

import jakarta.annotation.Generated;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Appointment {

	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private Date appointmentDate;
	private ApprovalStatus approvalStatus;
	
	@OneToMany(mappedBy = "appointment")
	private Set<DiagnosticTest> diagnosticTests;
	
	@ManyToOne
	@JoinColumn(name="patientId",referencedColumnName = "id")
	private Patient patient;
	
	@ManyToOne
	@JoinColumn(name="diagnosticCenterId",referencedColumnName = "id")
	private DiagnosticCenter diagnosticCenter;
	
	@OneToMany(mappedBy="appointment")
	private Set<TestResult> testResults;
}

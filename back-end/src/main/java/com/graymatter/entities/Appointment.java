package com.graymatter.entities;

import java.sql.Date;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
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
	
	   @ManyToMany
	    @JoinTable(
	        name = "appointment_diagnostic_test",
	        joinColumns = @JoinColumn(name = "appointment_id"),
	        inverseJoinColumns = @JoinColumn(name = "diagnostic_test_id")
	    )
	    private Set<DiagnosticTest> diagnosticTests;

	    @ManyToOne
	    @JoinColumn(name = "patient_id")
	    private Patient patient;

	    @ManyToOne
	    @JoinColumn(name = "diagnostic_center_id")
	    private DiagnosticCenter diagnosticCenter;

	    @OneToMany(mappedBy = "appointment",cascade = CascadeType.ALL, orphanRemoval = true) // Delete TestResult when Appointment is deleted)
	    private Set<TestResult> testResults;
}

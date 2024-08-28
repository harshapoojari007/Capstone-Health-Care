package com.graymatter.dto;

import java.sql.Date;
import java.util.Set;

import org.springframework.stereotype.Component;

import com.graymatter.entities.Appointment;
import com.graymatter.entities.ApprovalStatus;
import com.graymatter.entities.DiagnosticCenter;
import com.graymatter.entities.DiagnosticTest;
import com.graymatter.entities.Patient;
import com.graymatter.entities.TestResult;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Component
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentDto {
	
		private int id;
		
		@NotNull(message = "Appointment date cannot be null")
	    @Future(message = "Appointment date must be in the future")
		private Date appointmentDate;
		
		@NotNull(message = "Approval status cannot be null")
		private ApprovalStatus approvalStatus;
		
		@NotNull(message = "Diagnostic tests cannot be null")
	    @Size(min = 1, message = "At least one diagnostic test is required")
	    private Set<DiagnosticTest> diagnosticTests;
		
		@NotNull(message = "Patient cannot be null")
	    private Patient patient;
		
		@NotNull(message = "Diagnostic Center cannot be null")
	    private DiagnosticCenter diagnosticCenter;
		
	    private Set<TestResult> testResults;
	
}

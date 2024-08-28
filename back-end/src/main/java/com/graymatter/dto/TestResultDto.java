package com.graymatter.dto;

import java.util.Set;

import com.graymatter.entities.Appointment;
import com.graymatter.entities.DiagnosticCenter;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TestResultDto {
	private int id;
	@NotNull(message = "Test Name cannot be null")
    @Size(min = 1, max = 100, message = "Test Name must be between 1 and 100 characters")
	private String testName;
	
	@NotNull(message = "Test reading cannot be null")
    @Positive(message = "Test reading must be positive")
	private double testReading;
	
    @Size(max = 255, message = "Test condition cannot be more than 255 characters")
	private String testCondition;
    
    @NotNull(message = "Appointment cannot be null")
	private Appointment appointment;

}

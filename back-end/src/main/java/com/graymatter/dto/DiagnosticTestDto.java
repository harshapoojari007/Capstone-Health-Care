package com.graymatter.dto;

import java.util.*;

import org.springframework.stereotype.Component;

import com.graymatter.entities.Appointment;
import com.graymatter.entities.DiagnosticCenter;
import com.graymatter.entities.DiagnosticTest;

import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DiagnosticTestDto {

	private int id;
	
	@NotNull(message = "Test Name cannot be null")
    @Size(min = 1, max = 100, message = "Test Name must be between 1 and 100 characters")
	private String testName;
	
	@NotNull(message = "Test price cannot be null")
	@Positive(message = "Test price must be positive")
	private double testPrice;
	
	@Size(max = 255, message = "Normal value cannot be more than 255 characters")
	private String normalValue;
	
	 @Size(max = 50, message = "Units cannot be more than 50 characters")
	private String units;
	 
	@NotNull(message = "Diagnostic Centers cannot be null")
	@Size(min = 1, message = "At least one diagnostic center is required")
	private DiagnosticCenter diagnosticCenter;
	
    private List<Appointment> appointments=new ArrayList<Appointment>();
}

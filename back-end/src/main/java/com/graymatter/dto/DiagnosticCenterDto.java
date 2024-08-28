package com.graymatter.dto;

import java.util.Set;

import com.graymatter.entities.Appointment;
import com.graymatter.entities.CenterAdministrator;
import com.graymatter.entities.DiagnosticTest;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class DiagnosticCenterDto {
	    private int id;

	    private String name;
	    private String contactNO;
	    private String address;
	    private String email;
	    private Set<DiagnosticTest> diagnosticTests;
	    private Set<Appointment> appointments;
	    private CenterAdministrator centerAdmin;
}

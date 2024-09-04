	package com.graymatter.entities;

import java.util.*;

import com.fasterxml.jackson.annotation.JsonIgnore;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class DiagnosticTest {
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String testName;
	private double testPrice;
	private String normalValue;
	private String units;
	
	@ManyToMany
	@JoinTable(
	        name = "diagnostic_center_test",
	        joinColumns = @JoinColumn(name = "diagnostic_test_id"),
	        inverseJoinColumns = @JoinColumn(name = "diagnostic_center_id")
	    )
	@JsonIgnore
<<<<<<< HEAD
	private Set<DiagnosticCenter> diagnosticCenters;
=======
	private List<DiagnosticCenter> diagnosticCenters=new ArrayList<DiagnosticCenter>();
>>>>>>> bfe8f01c3e1610282283a4d8faeb047724adbb60
	
	@ManyToMany(mappedBy = "diagnosticTests")
	@JsonIgnore
    private List<Appointment> appointments=new ArrayList<Appointment>();

}

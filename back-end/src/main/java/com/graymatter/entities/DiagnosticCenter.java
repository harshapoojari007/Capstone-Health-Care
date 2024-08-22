package com.graymatter.entities;


import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class DiagnosticCenter {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String name;
	private String contactNO;
	private String address;
	private String email;
	@ManyToMany
	@JoinTable(name = "diagnostic_center_test",
	joinColumns = @JoinColumn(name = "diagnostic_center_id"),
	inverseJoinColumns = @JoinColumn(name = "diagnostic_test_id"))
	private Set<DiagnosticTest> tests;
	
	@OneToMany(mappedBy ="diagnosticCenter")
	private Set<Appointment> appointments;
}

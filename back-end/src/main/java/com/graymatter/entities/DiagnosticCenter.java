package com.graymatter.entities;


import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class DiagnosticCenter {
	
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private int id;

	    private String name;
	    private String contactNO;
	    private String address;
	    private String email;

	    @ManyToMany()
	    @JoinTable(
	        name = "diagnostic_center_test",
	        joinColumns = @JoinColumn(name = "diagnostic_center_id"),
	        inverseJoinColumns = @JoinColumn(name = "diagnostic_test_id")
	    )
	    private Set<DiagnosticTest> diagnosticTests;

	    @OneToMany(mappedBy = "diagnosticCenter",cascade = {CascadeType.ALL}, orphanRemoval = true)
	    private Set<Appointment> appointments;
	    
	    @OneToOne(cascade = {CascadeType.ALL})
	    @JoinColumn(name = "centerAdmin_id")
	    private CenterAdministrator centerAdmin;
}

package com.graymatter.entities;

import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
public class Patient {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private String name;
	private String phoneNo;
	private int age;
	private String gender;
	
	@OneToMany(mappedBy="patient", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<Appointment> appointments;
	
	@OneToOne
	@JoinColumn(name="userId",referencedColumnName = "id")
	private User user;
}	

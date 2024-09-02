package com.graymatter.dto;

import java.util.Set;

import com.graymatter.entities.Appointment;
import com.graymatter.entities.User;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class PatientDto {
	private int id;
	private String name;
	private String phoneNo;
	private int age;
	private String gender;
	
	private Set<Appointment> appointments;
	private User user;
}

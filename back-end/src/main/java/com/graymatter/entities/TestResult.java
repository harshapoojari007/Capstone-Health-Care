package com.graymatter.entities;

import java.sql.Date;
import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class TestResult {
	@Id
    @GeneratedValue(strategy = GenerationType.AUTO)
	private int id;
	private double testReading;
	private String testCondition;
	
	@ManyToOne
	@JoinColumn(name="appointmentId",referencedColumnName = "id")
	private Appointment appointment;
}

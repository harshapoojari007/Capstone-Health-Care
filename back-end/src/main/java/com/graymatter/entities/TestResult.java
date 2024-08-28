package com.graymatter.entities;



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
	private String testName;
	private double testReading;
	private String testCondition;
	
	@ManyToOne
	@JoinColumn(name="appointmentId",referencedColumnName = "id")
	private Appointment appointment;
}

package com.graymatter.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.graymatter.entities.Appointment;
import com.graymatter.entities.Patient;


public interface AppointmentRepository extends JpaRepository<Appointment, Integer>{

	@Query(value = "SELECT * FROM appointment WHERE appointmentDate > CURRENT_DATE", nativeQuery = true)
	List<Appointment> findAllUpcomingAppointments();
	
	@Query(value = "SELECT * FROM appointment WHERE appointmentDate < CURRENT_DATE", nativeQuery = true)
	List<Appointment> findAllPastAppointments();
	
	List<Appointment> findByPatient(Patient patient);
}

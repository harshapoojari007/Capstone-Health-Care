package com.graymatter.dao;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.graymatter.entities.Appointment;
import com.graymatter.entities.DiagnosticCenter;
import com.graymatter.entities.DiagnosticTest;
import com.graymatter.entities.Patient;
import com.graymatter.entities.TestResult;
import com.graymatter.repositories.AppointmentRepository;
import com.graymatter.services.AppointmentServiceInterface;

@Repository
public class AppointmentDao{
	
	@Autowired
	AppointmentRepository repo;

	public List<Appointment> getAllAppointments() {
		// TODO Auto-generated method stub
		return repo.findAll();
	}

	
	public Appointment getAppointmentById(int id) {
		// TODO Auto-generated method stub
		return repo.findById(id).get();
	}

	
	public Appointment addAppointment(Appointment appointment) {
		// TODO Auto-generated method stub
		return repo.save(appointment);
	}

	
	public Appointment deleteAppointmentById(int id) {
		// TODO Auto-generated method stub
		Appointment a=repo.findById(id).get();
		repo.deleteById(id);
		return a;
	}

	
	public Appointment updateAppointment(int id, Appointment appointment) {
		// TODO Auto-generated method stub
		return repo.save(appointment);
	}

	
	public Set<DiagnosticTest> getAllTestOfAppointment(int id) {
		// TODO Auto-generated method stub
		Appointment appointment= repo.findById(id).get();
		return appointment.getDiagnosticTests();
		
	}

//	
//	public DiagnosticCenter getDiagnosticCenterOfAppointment(int id) {
//		// TODO Auto-generated method stub
//		Appointment appointment= repo.findById(id).get();
//		return appointment.getDiagnosticCenter();
//	}

	
	public Set<TestResult> getTestResultOfAppointment(int id) {
		// TODO Auto-generated method stub
		Appointment appointment= repo.findById(id).get();
		return appointment.getTestResults();
	}
	
	public List<Appointment> getUpcomingAppointments() {
		// TODO Auto-generated method stub
		return repo.findAllUpcomingAppointments();
	}

	
	public List<Appointment> getPastAppointments() {
		// TODO Auto-generated method stub
		return repo.findAllPastAppointments();
	}

	
	public List<Appointment> getAppointmentsOfPatient(Patient patient) {
		// TODO Auto-generated method stub
		return repo.findByPatient(patient);
	}

	
	public Patient getPatientByAppointment(int id) {
		// TODO Auto-generated method stub
		return repo.findById(id).get().getPatient();
	}
	
	
}

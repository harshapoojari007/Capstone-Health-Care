package com.graymatter.dao;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.graymatter.dto.PatientDto;
import com.graymatter.entities.Appointment;
import com.graymatter.entities.DiagnosticCenter;
import com.graymatter.entities.DiagnosticTest;
import com.graymatter.entities.Patient;
import com.graymatter.entities.TestResult;
import com.graymatter.exceptions.IdNotFoundException;
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

	
	public Appointment getAppointmentById(int id) throws IdNotFoundException  {
		// TODO Auto-generated method stub
		return repo.findById(id).orElseThrow(()->new IdNotFoundException("Appointment id: "+id+" is not present"));
	}

	
	public Appointment addAppointment(Appointment appointment) {
		// TODO Auto-generated method stub
		
		return repo.save(appointment);
	}

	
	public Appointment deleteAppointmentById(int id) throws IdNotFoundException {
		// TODO Auto-generated method stub
		Appointment appointment=repo.findById(id).orElseThrow(()->new IdNotFoundException("Appointment id: "+id+" is not present"));;
		repo.deleteById(id);
		return appointment;
	}

	
	public Appointment updateAppointment(int id, Appointment updatedAppointment) throws IdNotFoundException {
		// TODO Auto-generated method stub
		Appointment existingAppoinment=repo.findById(id).orElseThrow(()->new IdNotFoundException("Appointment id: "+id+" is not present"));
		if(updatedAppointment.getAppointmentDate()!=null)
			existingAppoinment.setAppointmentDate(updatedAppointment.getAppointmentDate());
		if(updatedAppointment.getApprovalStatus()!=null)
			existingAppoinment.setApprovalStatus(updatedAppointment.getApprovalStatus());
		if(updatedAppointment.getDiagnosticCenter()!=null)
			existingAppoinment.setDiagnosticCenter(updatedAppointment.getDiagnosticCenter());
		if(updatedAppointment.getDiagnosticTests()!=null)
			existingAppoinment.setPatient(updatedAppointment.getPatient());
		if(updatedAppointment.getTestResults()!=null)
			existingAppoinment.setTestResults(updatedAppointment.getTestResults());
		return repo.save(existingAppoinment);
	}

	
	public Set<DiagnosticTest> getAllTestOfAppointment(int id) throws IdNotFoundException {
		// TODO Auto-generated method stub
		Appointment appointment= repo.findById(id).orElseThrow(()->new IdNotFoundException("Appointment id: "+id+" is not present"));
		return appointment.getDiagnosticTests();
		
	}

//	
//	public DiagnosticCenter getDiagnosticCenterOfAppointment(int id) {
//		// TODO Auto-generated method stub
//		Appointment appointment= repo.findById(id).get();
//		return appointment.getDiagnosticCenter();
//	}

	
	public Set<TestResult> getTestResultOfAppointment(int id) throws IdNotFoundException {
		// TODO Auto-generated method stub
		Appointment appointment= repo.findById(id).orElseThrow(()->new IdNotFoundException("Appointment id: "+id+" is not present"));
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

	
	public List<Appointment> getAppointmentsOfPatient(int patient_id) {
		// TODO Auto-generated method stub
		
		return repo.findByPatient(patient_id);
	}

	
	public Patient getPatientByAppointment(int id) throws IdNotFoundException {
		// TODO Auto-generated method stub
		Appointment appointment=repo.findById(id).orElseThrow(()->new IdNotFoundException("Appointment id: "+id+" is not present"));
		return appointment.getPatient();
	}
	
	
}

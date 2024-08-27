package com.graymatter.services;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.graymatter.dao.AppointmentDao;
import com.graymatter.entities.Appointment;
import com.graymatter.entities.DiagnosticCenter;
import com.graymatter.entities.DiagnosticTest;
import com.graymatter.entities.Patient;
import com.graymatter.entities.TestResult;

@Service
public class AppointmentService implements AppointmentServiceInterface{

	@Autowired
	AppointmentDao dao;
	
	@Override
	public List<Appointment> getAllAppointments() {
		// TODO Auto-generated method stub
		return dao.getAllAppointments();
	}

	@Override
	public Appointment getAppointmentById(int id) {
		// TODO Auto-generated method stub
		return dao.getAppointmentById(id);
	}

	@Override
	public Appointment addAppointment(Appointment appointment) {
		// TODO Auto-generated method stub
		return dao.addAppointment(appointment);
	}

	@Override
	public Appointment deleteAppointmentById(int id) {
		// TODO Auto-generated method stub
		return dao.deleteAppointmentById(id);
		
	}

	@Override
	public Appointment updateAppointment(int id, Appointment appointment) {
		// TODO Auto-generated method stub
		return dao.updateAppointment(id,appointment);
	}

	@Override
	public Set<DiagnosticTest> getAllTestOfAppointment(int id) {
		// TODO Auto-generated method stub
		return dao.getAllTestOfAppointment(id);
	}

	@Override
	public Patient getPatientByAppointment(int id) {
		// TODO Auto-generated method stub
		return dao.getPatientByAppointment(id);
	}

//	@Override
//	public DiagnosticCenter getDiagnosticCenterOfAppointment(int id) {
//		// TODO Auto-generated method stub
//		return dao.getDiagnosticCenterOfAppointment(id);
//	}

	@Override
	public Set<TestResult> getTestResultOfAppointment(int id) {
		// TODO Auto-generated method stub
		return dao.getTestResultOfAppointment(id);
	}

	@Override
	public List<Appointment> getUpcomingAppointments() {
		// TODO Auto-generated method stub
		return dao.getUpcomingAppointments();
	}

	@Override
	public List<Appointment> getPastAppointments() {
		// TODO Auto-generated method stub
		return dao.getPastAppointments();
	}


	@Override
	public List<Appointment> getAppointmentsOfPatient(Patient patient) {
		// TODO Auto-generated method stub
		return dao.getAppointmentsOfPatient(patient);
	}

}

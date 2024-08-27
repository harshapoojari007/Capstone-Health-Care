package com.graymatter.services;

import java.util.List;
import java.util.Set;

import com.graymatter.entities.Appointment;
import com.graymatter.entities.DiagnosticCenter;
import com.graymatter.entities.DiagnosticTest;
import com.graymatter.entities.Patient;
import com.graymatter.entities.TestResult;

public interface AppointmentServiceInterface {

	public List<Appointment> getAllAppointments();
	public Appointment getAppointmentById(int id);
	public Appointment addAppointment(Appointment appointment);
	public Appointment deleteAppointmentById(int id);
	public Appointment updateAppointment(int id,Appointment appointment);
	public Set<DiagnosticTest> getAllTestOfAppointment(int id);
//	public DiagnosticCenter getDiagnosticCenterOfAppointment(int id);
	public Set<TestResult> getTestResultOfAppointment(int id);
	public List<Appointment> getUpcomingAppointments();
	public List<Appointment> getPastAppointments();
	public List<Appointment> getAppointmentsOfPatient(Patient patient);
	public Patient getPatientByAppointment(int id);
}

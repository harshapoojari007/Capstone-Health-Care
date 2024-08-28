package com.graymatter.services;

import java.util.List;
import java.util.Set;

import org.springframework.http.ResponseEntity;

import com.graymatter.dto.AppointmentDto;
import com.graymatter.dto.DiagnosticTestDto;
import com.graymatter.dto.PatientDto;
import com.graymatter.dto.TestResultDto;
import com.graymatter.entities.Appointment;
import com.graymatter.entities.DiagnosticCenter;
import com.graymatter.entities.DiagnosticTest;
import com.graymatter.entities.Patient;
import com.graymatter.entities.TestResult;
import com.graymatter.exceptions.IdNotFoundException;

public interface AppointmentServiceInterface {

	public ResponseEntity<?> getAllAppointments();
	public ResponseEntity<?>  getAppointmentById(int id) throws IdNotFoundException;
	public ResponseEntity<?>  addAppointment(AppointmentDto appointment);
	public ResponseEntity<?>  deleteAppointmentById(int id) throws IdNotFoundException;
	public ResponseEntity<?>  updateAppointment(int id,AppointmentDto appointment) throws IdNotFoundException;
	public ResponseEntity<?>  getAllTestOfAppointment(int id) throws IdNotFoundException;
//	public DiagnosticCenter getDiagnosticCenterOfAppointment(int id);
	public ResponseEntity<?>  getTestResultOfAppointment(int id) throws IdNotFoundException;
	public ResponseEntity<?>  getUpcomingAppointments();
	public ResponseEntity<?>  getPastAppointments();
	public ResponseEntity<?>  getAppointmentsOfPatient(int patient_id);
	public ResponseEntity<?>  getPatientByAppointment(int id) throws IdNotFoundException;
	
}

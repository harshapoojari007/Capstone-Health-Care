package com.graymatter.dto;

import com.graymatter.entities.Appointment;

public class AppointmentMapper {

	public Appointment mapToAppointment(AppointmentDto a) {
		return new Appointment(a.getId(),a.getAppointmentDate(),a.getApprovalStatus(),a.getDiagnosticTests(),a.getPatient(),a.getDiagnosticCenter(),a.getTestResults());
	}
	public AppointmentDto mapToAppointmentDto(Appointment a) {
		return new AppointmentDto(a.getId(),a.getAppointmentDate(),a.getApprovalStatus(),a.getDiagnosticTests(),a.getPatient(),a.getDiagnosticCenter(),a.getTestResults());
	}
	
}

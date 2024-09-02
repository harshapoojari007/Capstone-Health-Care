package com.graymatter.dto;

import org.springframework.stereotype.Component;

import com.graymatter.entities.Patient;
import com.graymatter.dto.PatientDto;

@Component
public class PatientMapper {

	public Patient mapToPatient(PatientDto patientDto) {
		return new Patient(patientDto.getId(),patientDto.getName(),patientDto.getPhoneNo(),patientDto.getAge(),patientDto.getGender(),patientDto.getAppointments(),patientDto.getUser());
	}
	public PatientDto mapToPatientDto(Patient patient) {
		return new PatientDto(patient.getId(),patient.getName(),patient.getPhoneNo(),patient.getAge(),patient.getGender(),patient.getAppointments(),patient.getUser());
	}
}

package com.graymatter.serviceTest;

import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.graymatter.entities.Appointment;
import com.graymatter.entities.ApprovalStatus;
import com.graymatter.entities.DiagnosticCenter;
import com.graymatter.repositories.AppointmentRepository;
import com.graymatter.services.AppointmentService;

@ExtendWith(MockitoExtension.class)
public class AppointmentServiceTest {

	@InjectMocks
	AppointmentService service;
	
	@Mock
	private AppointmentRepository appointmentRepo;
	
	
	
	@Test
	public void testAddAppointment() {
		ApprovalStatus ap= ApprovalStatus.APPROVED;
		List<DiagnosticCenter>=new DiagnosticCenter(1,"Naman","8322102831","324Dcross murugeshpalya","namanbhat123@gmial.com",null,)
		Appointment a = new Appointment(1,"2024-09-03",ap,);

}

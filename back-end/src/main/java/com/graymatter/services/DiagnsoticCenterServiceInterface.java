package com.graymatter.services;

import java.util.List;

import com.graymatter.dto.DiagnosticCenterDto;
import com.graymatter.dto.DiagnosticTestDto;
import com.graymatter.entities.Appointment;

interface DiagnsoticCenterServiceInterface {
	public List<DiagnosticCenterDto> getAllDiagnosticCenters();
	public DiagnosticCenterDto addDiagnosticCenter(DiagnosticCenterDto diagnosticCenter);
	public DiagnosticCenterDto getDiagnosticCenterById(int diagnosticCenterId);
	public DiagnosticCenterDto updateDiagnosticCenter(DiagnosticCenterDto diagnosticCenter);
	public DiagnosticTestDto viewTestResults(int diagnosticCentreId,String testName);
	public DiagnosticTestDto addTest(int diagnosticCentreId, int testId );
	public DiagnosticCenterDto removeDiagnosticCenter(int diagnosticCentreId);
	public List<Appointment> getListOfAppointments(String centerName);
	
}

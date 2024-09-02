package com.graymatter.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.graymatter.dao.DiagnosticCenterDao;
import com.graymatter.dto.DiagnosticCenterDto;
import com.graymatter.dto.DiagnosticCenterMapper;
import com.graymatter.dto.DiagnosticTestDto;
import com.graymatter.entities.Appointment;
import com.graymatter.entities.DiagnosticCenter;

@Service
public class DiagnosticCenterService implements DiagnsoticCenterServiceInterface{
	
	@Autowired
	DiagnosticCenterDao dao;
	
	@Autowired
	DiagnosticCenterMapper mapper;
	
	@Override
	public List<DiagnosticCenterDto> getAllDiagnosticCenters() {
		List<DiagnosticCenter> dclist= dao.getAllDiagnosticCenters();
		return dclist.stream().map((dc)->mapper.mapToDiagnosticCenterDto(dc)).collect(Collectors.toList());
	}

	@Override
	public DiagnosticCenterDto addDiagnosticCenter(DiagnosticCenterDto diagnosticCenter) {
		return mapper.mapToDiagnosticCenterDto(dao.addDiagnosticCenter(mapper.mapToDiagnosticCenter(diagnosticCenter)));
	}

	@Override
	public DiagnosticCenterDto getDiagnosticCenterById(int diagnosticCenterId) {
		return mapper.mapToDiagnosticCenterDto(dao.getDiagnosticCenterById(diagnosticCenterId));
	}

	@Override
	public DiagnosticCenterDto updateDiagnosticCenter(DiagnosticCenterDto diagnosticCenter) {
		return mapper.mapToDiagnosticCenterDto(dao.updateDiagnosticCenter(mapper.mapToDiagnosticCenter(diagnosticCenter)));
	}

	@Override
	public DiagnosticTestDto viewTestResults(int diagnosticCentreId, String testName) {
		return null;
	}

	@Override
	public DiagnosticTestDto addTest(int diagnosticCentreId, int testId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public DiagnosticCenterDto removeDiagnosticCenter(int diagnosticCentreId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Appointment> getListOfAppointments(String centerName) {
		// TODO Auto-generated method stub
		return null;
	}

}

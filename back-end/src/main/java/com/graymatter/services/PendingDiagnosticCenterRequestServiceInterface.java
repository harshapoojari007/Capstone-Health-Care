package com.graymatter.services;



import org.springframework.http.ResponseEntity;

import com.graymatter.dto.PendingDiagnosticCenterRequestDto;
import com.graymatter.exceptions.IdNotFoundException;

public interface PendingDiagnosticCenterRequestServiceInterface {
	public ResponseEntity<?> requestNewDiagnosticCenter(PendingDiagnosticCenterRequestDto request);
	public ResponseEntity<?> approveRequest(int id) throws IdNotFoundException;
	public ResponseEntity<?> getPendingRequests();
	public ResponseEntity<?> getAllRequests();
}

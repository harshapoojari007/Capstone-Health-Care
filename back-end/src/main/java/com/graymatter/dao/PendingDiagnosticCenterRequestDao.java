package com.graymatter.dao;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.graymatter.entities.PendingDiagnosticCenterRequest;
import com.graymatter.exceptions.IdNotFoundException;
import com.graymatter.repositories.PendingDiagnosticCenterRequestRepository;

@Repository
public class PendingDiagnosticCenterRequestDao {

	@Autowired
	PendingDiagnosticCenterRequestRepository repo;
	
	
	public PendingDiagnosticCenterRequest requestNewDiagnosticCenter(PendingDiagnosticCenterRequest request) {
        return repo.save(request);
    }

    public PendingDiagnosticCenterRequest approveRequest(int id) throws IdNotFoundException {
        PendingDiagnosticCenterRequest request = repo.findById(id).orElseThrow(() -> new IdNotFoundException("Id "+id+" Not found for the Request"));
        request.setApproved(true);
        repo.save(request);
        return request;
    }

    public List<PendingDiagnosticCenterRequest> getPendingRequests() {
        return repo.findAll().stream().filter(request -> !request.isApproved()).collect(Collectors.toList());
    }
    
    public List<PendingDiagnosticCenterRequest> getAllRequests(){
    	return repo.findAll();
    }
}

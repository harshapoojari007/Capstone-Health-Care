package com.graymatter.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.graymatter.dao.CenterAdministatorDao;
import com.graymatter.dto.CenterAdministratorDto;
import com.graymatter.dto.CenterAdministratorMapper;
import com.graymatter.entities.CenterAdministrator;

@Service
public class CenterAdministratorService implements CenterAdministratorServiceInterface{

	@Autowired
	CenterAdministatorDao dao;
	
	@Autowired
	CenterAdministratorMapper mapper;
	
	@Override
	public CenterAdministratorDto addCenterAdministrator(CenterAdministratorDto centerAdministrator) {
		return mapper.mapToCenterAdministratorDto(dao.addCenterAdministrator(mapper.mapToCenterAdministrator(centerAdministrator)));
	}

	@Override
	public List<CenterAdministratorDto> getAllCenterAdiministrators() {
		List<CenterAdministrator> calist= dao.getAllCenterAdministrators();
		return calist.stream().map((cAdmin)->mapper.mapToCenterAdministratorDto(cAdmin)).collect(Collectors.toList());
	}

	@Override
	public CenterAdministratorDto getCenterAdministratorById(int centerAdministratorId) {
		return mapper.mapToCenterAdministratorDto(dao.getCenterAdministratorById(centerAdministratorId));
	}

	@Override
	public void deleteCenterAdministrator(int centerAdminId) {
		dao.deleteCenterAdministrator(centerAdminId);
		
	}

	@Override
	public CenterAdministratorDto updateCenterAdministrator(CenterAdministratorDto centerAdministrator) {
		return mapper.mapToCenterAdministratorDto(dao.updateCenterAdministrator(mapper.mapToCenterAdministrator(centerAdministrator)));
	}

}

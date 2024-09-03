package com.graymatter.dto;


import org.springframework.stereotype.Component;

import com.graymatter.entities.CenterAdministrator;
@Component
public class CenterAdministratorMapper {
	public CenterAdministrator mapToCenterAdministrator(CenterAdministratorDto cDto) {
		return new CenterAdministrator(cDto.getId(),cDto.getName(),cDto.getPhoneNo(),cDto.getAddress(),cDto.getDiagnosticCenter(),cDto.getUser());
	}
	public CenterAdministratorDto mapToCenterAdministratorDto(CenterAdministrator c) {
		return new CenterAdministratorDto(c.getId(),c.getName(),c.getPhoneNo(),c.getAddress(),c.getDiagnosticCenter(),c.getUser());
	}
}

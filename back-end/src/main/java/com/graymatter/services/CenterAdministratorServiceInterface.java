package com.graymatter.services;

import java.util.List;

import com.graymatter.dto.CenterAdministratorDto;

public interface CenterAdministratorServiceInterface {
	public CenterAdministratorDto addCenterAdministrator(CenterAdministratorDto centerAdministrator);
	public List<CenterAdministratorDto> getAllCenterAdiministrators();
	public CenterAdministratorDto getCenterAdministratorById(int centerAdministratorId);
	public void deleteCenterAdministrator(int centerAdminId);
	public CenterAdministratorDto updateCenterAdministrator(CenterAdministratorDto centerAdministrator);
}

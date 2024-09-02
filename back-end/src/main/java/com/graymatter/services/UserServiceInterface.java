package com.graymatter.services;

import java.util.List;

import com.graymatter.dto.UserDto;

public interface UserServiceInterface {
	public List<UserDto> getAllUsers();
	public UserDto addNewUser(UserDto user);
	public UserDto updateUser(UserDto user);
	public void deleteUser(int userId);
	public UserDto getUserById(int userId);
}

package com.graymatter.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.graymatter.dao.UserDao;
import com.graymatter.dto.UserDto;
import com.graymatter.dto.UserMapper;
import com.graymatter.entities.User;

@Service
public class UserService implements UserServiceInterface{
	@Autowired
	UserDao dao;
	
	@Autowired
	UserMapper mapper;
	
	@Override
	public List<UserDto> getAllUsers() {
		List<User> userList= dao.getAllUsers();
		return userList.stream().map((user)->mapper.mapToUserDto(user)).collect(Collectors.toList());
	}

	@Override
	public UserDto addNewUser(UserDto user) {
		return mapper.mapToUserDto(dao.addNewUser(mapper.mapToUser(user)));
	}

	@Override
	public UserDto updateUser(UserDto user) {
		return mapper.mapToUserDto(dao.updateUser(mapper.mapToUser(user)));
	}

	@Override
	public void deleteUser(int userId) {
		dao.deleteUser(userId);
		
	}

	@Override
	public UserDto getUserById(int userId) {
		return mapper.mapToUserDto(dao.getUserById(userId));
	}

}

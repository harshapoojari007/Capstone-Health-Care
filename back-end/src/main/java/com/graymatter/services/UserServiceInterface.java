package com.graymatter.services;



import org.springframework.http.ResponseEntity;

import com.graymatter.dto.UserDto;
import com.graymatter.exceptions.IdNotFoundException;

public interface UserServiceInterface {
	public ResponseEntity<?> getAllUsers();
	public ResponseEntity<?> addNewUser(UserDto user);
	public ResponseEntity<?> updateUser(int userId,UserDto user) throws IdNotFoundException;
	public ResponseEntity<?> deleteUser(int userId) throws IdNotFoundException;
	public ResponseEntity<?> getUserById(int userId) throws IdNotFoundException;
	public ResponseEntity<?> getUserByUserName(String username);

}

package com.graymatter.controllers;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.graymatter.dto.UserDto;
import com.graymatter.exceptions.IdNotFoundException;
import com.graymatter.exceptions.InvalidCredentialsException;
import com.graymatter.exceptions.UserOrEmailAlreadyPresent;
import com.graymatter.services.UserService;

@RestController
@RequestMapping("/api/v1")
public class UserController {
	@Autowired
	UserService service;
	
	@PostMapping("/user")
	public ResponseEntity<?> addNewUser(@RequestBody UserDto user) throws UserOrEmailAlreadyPresent
	{
		return service.addNewUser(user);
	}
	@GetMapping("/user/{username}")
	public ResponseEntity<?> getUserByUsername(@Param("username") String userName){
		return service.getUserByUserName(userName);
	}
	@GetMapping("/user")
	public ResponseEntity<?> getAllUsers(){
		return service.getAllUsers();
	}
	@GetMapping("/user/{id}")
	public ResponseEntity<?> getUserByUserId(@Param("id") int id) throws IdNotFoundException{
		return service.getUserById(id);
	}
	@DeleteMapping("/user/{id}")
	public ResponseEntity<?> deleteUserById(@PathVariable("id") int id) throws IdNotFoundException{
		return service.deleteUser(id);
	}
	
	@PostMapping("/user/login")
	public ResponseEntity<?> loginUser(@RequestBody Map<String, Object> requestBody) throws InvalidCredentialsException{
		String username=(String)requestBody.get("username");
		String password=(String)requestBody.get("password");
		return service.loginUser(username, password);
		
	}

}

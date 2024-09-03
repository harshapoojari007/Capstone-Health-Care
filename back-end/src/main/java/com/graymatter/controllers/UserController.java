package com.graymatter.controllers;

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
import com.graymatter.services.UserService;

@RestController
@RequestMapping("/api/v1")
public class UserController {
	@Autowired
	UserService service;
	
	@PostMapping("/user")
	public ResponseEntity<?> addNewUser(@RequestBody UserDto user)
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
	
}

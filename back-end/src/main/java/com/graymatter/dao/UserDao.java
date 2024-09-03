package com.graymatter.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.graymatter.entities.User;
import com.graymatter.exceptions.IdNotFoundException;
import com.graymatter.repositories.UserRepository;

@Repository
public class UserDao {

	@Autowired
	UserRepository repo;

	public User getUserById(int userId) throws IdNotFoundException {
		return repo.findById(userId).orElseThrow(()->new IdNotFoundException("Appointment id: "+userId+" is not present"));
	}

	public User deleteUser(int userId) throws IdNotFoundException {
		User u= repo.findById(userId).orElseThrow(()->new IdNotFoundException("Appointment id: "+ userId+" is not present"));
		repo.deleteById(userId);
		return u;
		
	}


	public User addNewUser(User user) {
		return repo.save(user);
	}

	public List<User> getAllUsers() {
		return repo.findAll();
	}
	
	public User findUserByUsername(String userName) {
		return repo.findByUsername(userName);
	}

	public User updateUser(int userId, User user) throws IdNotFoundException {
		 User existingUser =repo.findById(userId).orElseThrow(()->new IdNotFoundException("User id: "+userId+" is not present"));
	       

	        // Update fields from UserDto if they are not null
	        if (user.getUsername() != null && !user.getUsername().isEmpty()) {
	            existingUser.setUsername(user.getUsername());
	        }
	        if (user.getPassword() != null && !user.getPassword().isEmpty()) {
	            existingUser.setPassword(user.getPassword());
	        }
	        if (user.getEmail() != null && !user.getEmail().isEmpty()) {
	            existingUser.setEmail(user.getEmail());
	        }
	        if (user.getRole() != null && !user.getRole().isEmpty()) {
	            existingUser.setRole(user.getRole());
	        }

	        // Save the updated user
	        User updatedUser = repo.save(existingUser);

	        return updatedUser;
	    }
		
	}


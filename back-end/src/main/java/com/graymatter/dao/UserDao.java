package com.graymatter.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.graymatter.entities.User;
import com.graymatter.repositories.UserRepository;

@Repository
public class UserDao {

	@Autowired
	UserRepository repo;

	public User getUserById(int userId) {
		return repo.findById(userId).get();
	}

	public void deleteUser(int userId) {
		repo.deleteById(userId);
		
	}

	public User updateUser(User user) {
		return repo.save(user);
	}

	public User addNewUser(User user) {
		return repo.save(user);
	}

	public List<User> getAllUsers() {
		return repo.findAll();
	}
}

package com.graymatter.dao;


import java.sql.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Repository;

import com.graymatter.dto.LoginUserDto;
import com.graymatter.dto.RegUserDto;
import com.graymatter.entities.User;
import com.graymatter.exceptions.UserOrEmailAlreadyPresent;
import com.graymatter.repositories.UserRepository;

@Repository
public class AuthenticationDao {
	
	@Autowired
	private UserDao userDao;
	
	@Autowired
	UserRepository userRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	public User signUp(RegUserDto regUserDto) throws UserOrEmailAlreadyPresent {
		User user = new User();
		user.setEmail(regUserDto.getEmail());
		user.setUsername(regUserDto.getUsername());
		user.setPassword(passwordEncoder.encode(regUserDto.getPassword()));
		user.setRole(regUserDto.getRole());
		User savedUser = userDao.addNewUser(user);
		
		return savedUser;
	}
	
	public User login(LoginUserDto loginUserDto) {
//        if(loginUserDto.getEmail()==null) {
//        	return userRepository.findByUsername(loginUserDto.getEmail()).get();
//        }
		return userRepository.findByEmail(loginUserDto.getEmail()).get();
	}

}

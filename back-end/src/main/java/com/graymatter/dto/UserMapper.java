package com.graymatter.dto;

import com.graymatter.entities.User;

public class UserMapper {
	public User mapToUser(UserDto userDto) {
		return new User(userDto.getId(),userDto.getUsername(),userDto.getPassword(),userDto.getEmail(),userDto.getRole());
	}
	public UserDto mapToUserDto(User u) {
		return new UserDto(u.getId(),u.getUsername(),u.getPassword(),u.getEmail(),u.getRole());
	}
}

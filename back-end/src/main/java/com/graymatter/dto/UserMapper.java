package com.graymatter.dto;

import com.graymatter.entities.User;

public class UserMapper {
	public User mapToUser(UserDto userDto) {
		return new User(userDto.getId(),userDto.getName(),userDto.getPassword(),userDto.getRole());
	}
	public UserDto mapToUserDto(User u) {
		return new UserDto(u.getId(),u.getName(),u.getPassword(),u.getRole());
	}
}

package com.graymatter.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.graymatter.services.UserService;

@RestController
@RequestMapping("")
public class UserController {

	UserService service;
}

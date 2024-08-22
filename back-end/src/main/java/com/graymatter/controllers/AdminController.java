package com.graymatter.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.graymatter.services.AdminService;

@RestController
@RequestMapping("")
public class AdminController {
	
	AdminService service;

}

package com.graymatter.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.graymatter.services.CenterAdministratorService;

@RestController
@RequestMapping("")
public class CenterAdministratorController {

	CenterAdministratorService service;
}

package com.graymatter.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.graymatter.services.PatientService;

@RestController
@RequestMapping("")
public class PatientController {

	PatientService service;
}

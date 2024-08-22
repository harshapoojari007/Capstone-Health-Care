package com.graymatter.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.graymatter.services.AppointmentService;

@RestController
@RequestMapping("")
public class AppointmentController {

	AppointmentService service;
}

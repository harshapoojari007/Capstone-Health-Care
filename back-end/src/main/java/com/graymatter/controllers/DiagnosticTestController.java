package com.graymatter.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.graymatter.services.DiagnosticTestService;

@RestController
@RequestMapping("")
public class DiagnosticTestController {

	DiagnosticTestService service;
}

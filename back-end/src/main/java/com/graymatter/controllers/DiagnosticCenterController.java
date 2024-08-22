package com.graymatter.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.graymatter.services.DiagnosticCenterService;

@RestController
@RequestMapping("")
public class DiagnosticCenterController {

	DiagnosticCenterService service;
}

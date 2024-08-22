package com.graymatter.controllers;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.graymatter.services.TestResultService;

@RestController
@RequestMapping("")
public class TestResultController {

	TestResultService service;
}

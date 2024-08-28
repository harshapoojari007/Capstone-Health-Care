package com.graymatter.dto;

import org.springframework.stereotype.Component;

import com.graymatter.entities.TestResult;

@Component
public class TestResultMapper {

	public TestResult mapToTestResult(TestResultDto result) {
		return new TestResult(result.getId(),result.getTestName(),result.getTestReading(),result.getTestCondition(),result.getAppointment());
	}
	
	public TestResultDto mapToTestResultDto(TestResult result) {
		return new TestResultDto(result.getId(),result.getTestName(),result.getTestReading(),result.getTestCondition(),result.getAppointment());
	}
}

package com.graymatter.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptions {
	@ExceptionHandler(IdNotFoundException.class)
	public ResponseEntity<String> handleIdNotFoundException(IdNotFoundException rnfe){
		return new ResponseEntity<>(rnfe.getMessage(),HttpStatus.NOT_FOUND);
	}

//	@ExceptionHandler(ConflictException.class)
//	public ResponseEntity<String> handleConflictException(ConflictException rnfe){
//		return new ResponseEntity<>(rnfe.getMessage(),HttpStatus.CONFLICT);
//	}
	

}

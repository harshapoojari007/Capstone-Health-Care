package com.graymatter.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.graymatter.entities.Appointment;


public interface AppointmentRepository extends JpaRepository<Appointment, Integer>{

}

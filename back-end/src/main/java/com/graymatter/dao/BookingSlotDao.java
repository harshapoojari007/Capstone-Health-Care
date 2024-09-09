package com.graymatter.dao;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.graymatter.entities.BookingSlot;
import com.graymatter.exceptions.ConflictException;
import com.graymatter.repositories.BookingSlotRepository;

@Repository
public class BookingSlotDao {
	@Autowired
	BookingSlotRepository repo;
	
	public BookingSlot addSlot(BookingSlot b) throws ConflictException {
		boolean exists = repo.existsByCenterIdAndDate(b.getCenter_id(), b.getDate());
        if (exists) {
            throw new ConflictException("A booking slot already exists for this center on the specified date.");
        }
		return repo.save(b);
		
	}
	public int getSlotOfCenter(int center_id,Date date) {
		return repo.getSlotOfCenter(center_id,date);
		
	}
	public void updateSlot(int center_id,Date date) {
		repo.updateSlot(center_id,date);
		
	} 
	public List<Integer> availableCenterIds(Date date) {
		return repo.availableCenterIds(date);
		
	}
	public List<BookingSlot> getBookingSlotOfCenter(int id) {
		// TODO Auto-generated method stub
		return repo.findByCenter_id(id);
	}
	

}

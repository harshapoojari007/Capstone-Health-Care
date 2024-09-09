package com.graymatter.services;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.graymatter.dao.BookingSlotDao;
import com.graymatter.entities.BookingSlot;
import com.graymatter.exceptions.ConflictException;

@Service
public class BookingSlotService {
	
	@Autowired
	BookingSlotDao dao;
	public BookingSlot addSlot(BookingSlot b) throws ConflictException {
		return dao.addSlot(b);
		
	}
	public int getSlotOfCenter(int center_id,Date date) {
		return dao.getSlotOfCenter(center_id,date);
		
	}
	public void updateSlot(int center_id,Date date) {
		 dao.updateSlot(center_id,date);
		
	} 
	public List<Integer> availableCenterIds(Date date) {
		return dao.availableCenterIds(date);
		
	}
	public List<BookingSlot> getBookingSlotOfCenter(int id) {
		// TODO Auto-generated method stub
		return dao.getBookingSlotOfCenter(id);
	}
	

}

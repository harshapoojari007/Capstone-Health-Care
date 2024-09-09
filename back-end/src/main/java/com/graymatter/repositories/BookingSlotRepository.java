package com.graymatter.repositories;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.graymatter.entities.BookingSlot;

import jakarta.transaction.Transactional;

public interface BookingSlotRepository extends JpaRepository<BookingSlot, Integer>{

	 @Query("SELECT DISTINCT b.center_id FROM BookingSlot b WHERE b.date = :date AND b.slot > 0")
	   List<Integer> availableCenterIds(@Param("date") Date date);
	 
	 @Query("SELECT b.slot FROM BookingSlot b WHERE b.center_id = :centerId AND b.date = :date")
	    int getSlotOfCenter(@Param("centerId") int centerId, @Param("date") Date date);

	 
	    @Modifying
	    @Transactional
	    @Query("UPDATE BookingSlot b SET b.slot = b.slot - 1 WHERE b.center_id = :centerId AND b.date = :date AND b.slot > 0")
	    void updateSlot(@Param("centerId") int centerId, @Param("date") Date date);
	    

	    @Query("SELECT COUNT(b) > 0 FROM BookingSlot b WHERE b.center_id = :center_id AND b.date = :date")
	    boolean existsByCenterIdAndDate(@Param("center_id") int center_id, @Param("date") Date date);
	    
	    @Query("select b from BookingSlot b where b.center_id=:id")
	    List<BookingSlot> findByCenter_id(@Param("id")int id);
}

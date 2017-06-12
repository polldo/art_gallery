package it.uniroma3.service;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import it.uniroma3.model.Room;
import it.uniroma3.repository.RoomRepository;

@Service
public class RoomService {
    private final RoomRepository roomRepository;
    private final Logger logger = Logger.getLogger(RoomService.class);
    
    @Autowired
    public RoomService(RoomRepository roomRepository) {
        this.roomRepository = roomRepository;
    }
    
    public List<Room> getAll() {
		logger.info("Get all Rooms");
    	return roomRepository.findAll();
    }
    
    public Room getRoom(Long id) {
		logger.info("Get Room by id " + id);
    	return roomRepository.findOne(id);
    }        
}

package it.uniroma3.controller;

import java.util.List;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import it.uniroma3.model.Room;
import it.uniroma3.service.RoomService;

@RestController
@RequestMapping("/rooms")
public class RoomController {
	
	private final RoomService roomService;
	private final Logger logger = Logger.getLogger(RoomController.class);
	
	@Autowired 
	public RoomController (RoomService roomService) {
		this.roomService = roomService;
	}
	
	@RequestMapping(method = RequestMethod.GET)
	public List<Room> getRooms() {
		logger.info("Requested all Rooms");
		return roomService.getAll();
	}
	
	@RequestMapping(value = "/id/{id}", method = RequestMethod.GET)
	public Room getPainting(@PathVariable Long id) {
        logger.info("Requested Room by id");
        return roomService.getRoom(id);
	}
	

}

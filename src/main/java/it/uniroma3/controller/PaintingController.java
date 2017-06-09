package it.uniroma3.controller;

import it.uniroma3.model.Painting;
import it.uniroma3.service.PaintingService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/paintings")
public class PaintingController {
	private final PaintingService paintingService;
	private final Logger logger = Logger.getLogger(PaintingController.class);
	
	@Autowired PaintingController (PaintingService paintingService) {
		this.paintingService = paintingService;
	}
	
	@RequestMapping(method = RequestMethod.GET)
	public List<Painting> getPaintings() {
		logger.info("Requested all Paintings");
		return paintingService.getAll();
	}
	
	@RequestMapping(value = "/id/{id}", method = RequestMethod.GET)
	public Painting getPainting(@PathVariable Long id) {
        logger.info("Requested Painting by id");
        return paintingService.getPainting(id);
	}
}

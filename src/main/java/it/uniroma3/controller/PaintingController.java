package it.uniroma3.controller;

import it.uniroma3.model.Painting;
import it.uniroma3.service.PaintingService;
import it.uniroma3.service.PictureService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/paintings")
public class PaintingController {
	private final PaintingService paintingService;
	private final PictureService pictureService;
	private final Logger logger = Logger.getLogger(PaintingController.class);

	@Autowired
	public PaintingController (PaintingService paintingService, PictureService pictureService) {
		this.paintingService = paintingService;
		this.pictureService = pictureService;
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

	@RequestMapping(value = "/title/{title}", method = RequestMethod.GET)
	public List<Painting> getPaintingByTitle(@PathVariable String title) {
		logger.info("Requested Painting by title");
		return paintingService.getPaintingByTitle(title);
	}

	@RequestMapping(value = "/medium/{medium}", method = RequestMethod.GET)
	public List<Painting> getPaintingByMedium(@PathVariable String medium) {
		logger.info("Requested Painting by medium");
		return paintingService.getPaintingByMedium(medium);
	}

	@RequestMapping(value = "/year/{year}", method = RequestMethod.GET)
	public List<Painting> getPaintingByYear(@PathVariable Integer year) {
		logger.info("Requested Painting by year");
		return paintingService.getPaintingByYear(year);
	}
	
	@RequestMapping(value = "/room/{id}", method = RequestMethod.GET)
	public List<Painting> getPaintingByRoomId(@PathVariable Long id) {
		logger.info("Requested Painting by Room");
		return paintingService.getPaintingByRoom(id);
	}

	@RequestMapping(value = "/author/{id}", method = RequestMethod.GET)
	public List<Painting> getPaintingByAuthorId(@PathVariable Long id) {
		logger.info("Requested Painting by Author");
		return paintingService.getPaintingByAuthorId(id);
	}

	@RequestMapping(method = RequestMethod.POST)
	public ResponseEntity<?> addPainting(@Validated @RequestBody Painting painting, BindingResult bindingResult) {
		logger.info("Request to add Painting");
		if(bindingResult.hasErrors()) {
			return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
		}
		Painting addedPainting = paintingService.addPainting(painting);
		return ResponseEntity.ok(addedPainting);
	}

	@RequestMapping(value = "/id/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<?> removePaintingById(@PathVariable Long id) {
		logger.info("Request to remove Painting by id");
		pictureService.RemovePicturesByPaintingId(id);
		paintingService.removePaintingById(id);
		return ResponseEntity.ok().build();
	}

}

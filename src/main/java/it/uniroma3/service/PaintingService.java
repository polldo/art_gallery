package it.uniroma3.service;

import it.uniroma3.model.Painting;
import it.uniroma3.repository.PaintingRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PaintingService {
	private final PaintingRepository paintingRepository;
	private final Logger logger = Logger.getLogger(PaintingService.class);
	
	@Autowired
	public PaintingService(PaintingRepository paintingRepository) {
		this.paintingRepository = paintingRepository;
	}
	
	public List<Painting> getAll() {
		logger.info("Get all Paintings");
		return paintingRepository.findAll();
	}
	
	public Painting getPainting(Long id) {
		logger.info("Get Painting by id " + id);
		return paintingRepository.findOne(id);
	}	
}

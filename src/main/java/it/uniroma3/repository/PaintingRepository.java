package it.uniroma3.repository;

import it.uniroma3.model.Painting;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface PaintingRepository extends GenericRepository<Painting, Long> {

	public List<Painting> findPaintingsByTitle(String title);

	public List<Painting> findPaintingsByMedium(String medium);

	public List<Painting> findPaintingsByYear(Integer year);
	
	public List<Painting> findPaintingsByRoom_Id(Long id);

	public List<Painting> findPaintingsByAuthor_Id(Long id);

	@Transactional
	public void deletePaintingsByAuthor_Id(Long id);

}

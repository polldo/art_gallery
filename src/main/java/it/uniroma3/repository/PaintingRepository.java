package it.uniroma3.repository;

import java.util.List;
import it.uniroma3.model.Painting;

public interface PaintingRepository extends GenericRepository<Painting, Long> {

	List<Painting> findPaintingsByTitle(String title);

	List<Painting> findPaintingsByMedium(String medium);

	List<Painting> findPaintingsByYear(Integer year);

}

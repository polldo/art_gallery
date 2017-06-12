package it.uniroma3.repository;

import it.uniroma3.model.Painting;

import java.util.List;

public interface PaintingRepository extends GenericRepository<Painting, Long> {

	List<Painting> findPaintingsByTitle(String title);

	List<Painting> findPaintingsByMedium(String medium);

	List<Painting> findPaintingsByYear(Integer year);

	List<Painting> findPaintingsByAuthor_Id(Long id);

}

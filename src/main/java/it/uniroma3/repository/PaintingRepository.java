package it.uniroma3.repository;

import it.uniroma3.model.Painting;

import java.util.List;

public interface PaintingRepository extends GenericRepository<Painting, Long> {

	public List<Painting> findPaintingsByTitle(String title);

	public List<Painting> findPaintingsByMedium(String medium);

	public List<Painting> findPaintingsByYear(Integer year);

	public List<Painting> findPaintingsByAuthor_Id(Long id);

	public void deletePaintingsByAuthor_Id(Long id);

}

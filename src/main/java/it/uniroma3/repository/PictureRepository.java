package it.uniroma3.repository;

import it.uniroma3.model.Picture;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by poldo on 09/06/17.
 */
public interface PictureRepository extends GenericRepository<Picture, Long> {

    @Transactional
    public void deletePicturesByPainting_Id(Long id);
}

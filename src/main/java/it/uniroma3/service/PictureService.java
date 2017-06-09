package it.uniroma3.service;

import it.uniroma3.model.Picture;
import it.uniroma3.repository.PictureRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by poldo on 09/06/17.
 */
@Service
public class PictureService {
    private final PictureRepository pictureRepository;
    private final Logger logger = Logger.getLogger(PictureService.class);

    @Autowired
    public PictureService(PictureRepository pictureRepository) {
        this.pictureRepository = pictureRepository;
    }

    public Picture getPicture(Long id) {
        logger.info("Get picture by id " + id);
        return pictureRepository.findOne(id);
    }

    public Picture AddPicture(Picture picture) throws Exception {
        logger.info("Add picture");
        Picture returnedPicture = null;
        try {
            returnedPicture = pictureRepository.save(picture);
        } catch(Exception e) {
            logger.error(e.toString());
            throw e;
        }
        return returnedPicture;
    }
}

package it.uniroma3.service;

import it.uniroma3.model.Portrait;
import it.uniroma3.repository.PortraitRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by poldo on 14/06/17.
 */
@Service
public class PortraitService {
    private final PortraitRepository portraitRepository;
    private final Logger logger = Logger.getLogger(PictureService.class);

    @Autowired
    public PortraitService(PortraitRepository portraitRepository) {
        this.portraitRepository = portraitRepository;
    }

    public Portrait getPortrait(Long id) {
        logger.info("Get portrait by id " + id);
        return portraitRepository.findOne(id);
    }

    public Portrait addPortrait(Portrait portrait) throws Exception {
        logger.info("Add Portrait");
        Portrait returnedPortrait= null;
        try {
            returnedPortrait = portraitRepository.save(portrait);
        } catch(Exception e) {
            logger.error(e.toString());
            throw e;
        }
        return returnedPortrait;
    }

    public void removePortraitByAuthorId(Long id) {
        logger.info("Remove portrait by author id " + id);
        portraitRepository.deletePortraitsByAuthor_Id(id);
    }

}

package it.uniroma3.controller;

import it.uniroma3.model.Author;
import it.uniroma3.model.Portrait;
import it.uniroma3.service.PortraitService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/**
 * Created by poldo on 14/06/17.
 */
@RestController
@RequestMapping(value = "/portraits")
public class PortraitController {
    private final PortraitService portraitService;
    private final Logger logger = Logger.getLogger(PortraitController.class);

    @Autowired
    public PortraitController(PortraitService portraitService) {
        this.portraitService = portraitService;
    }

    @RequestMapping(value = "/id/{id}", method = RequestMethod.GET)
    public ResponseEntity<byte[]> getPortraitBytes(@PathVariable Long id) {
        logger.info("Get Portrait by author id" + id);
        Portrait picture = portraitService.getPortrait(id);
        if (picture != null) {
            return ResponseEntity.ok(picture.getBytes());
        }
        return ResponseEntity.badRequest().build();
    }

    @RequestMapping(value = "/id/{id}", method = RequestMethod.POST)
    public ResponseEntity<?> addPortrait(@PathVariable Long id, @RequestParam MultipartFile file) {
        logger.info("Add Portrait by author id " + id);
        try {
            byte[] bytes = file.getBytes();
            Portrait portrait = new Portrait();
            portrait.setBytes(bytes);
            logger.info("Get the correspondent Author");
            //Painting painting = paintingService.getPainting(id);
            //picture.setPainting(painting);
            Author author = new Author();
            author.setId(id);
            portrait.setAuthor(author);
            portrait.setId(id);
            portraitService.addPortrait(portrait);
        } catch (Exception e) {
            logger.error(e.toString());
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }
}

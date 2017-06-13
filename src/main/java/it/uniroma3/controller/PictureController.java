package it.uniroma3.controller;

import it.uniroma3.model.Painting;
import it.uniroma3.model.Picture;
import it.uniroma3.service.PaintingService;
import it.uniroma3.service.PictureService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/**
 * Created by poldo on 09/06/17.
 */
@RestController
@RequestMapping("/pictures")
public class PictureController {
    private final PictureService pictureService;
    private final PaintingService paintingService;
    private final Logger logger = Logger.getLogger(PictureController.class);

    @Autowired
    public PictureController(PictureService pictureService, PaintingService paintingService) {
        this.pictureService = pictureService;
        this.paintingService = paintingService;
    }

    @RequestMapping(value = "/id/{id}", method = RequestMethod.GET)
    public ResponseEntity<byte[]> getPictureBytes(@PathVariable Long id) {
        logger.info("Get picture by painting id" + id);
        Picture picture = pictureService.getPicture(id);
        if (picture != null) {
            return ResponseEntity.ok(picture.getBytes());
        }
        return ResponseEntity.badRequest().build();
    }

    @RequestMapping(value = "/id/{id}", method = RequestMethod.POST)
    public ResponseEntity<?> addPicture(@PathVariable Long id, @RequestParam MultipartFile file) {
        logger.info("Add picture by painting id " + id);
        try {
            byte[] bytes = file.getBytes();
            Picture picture = new Picture();
            picture.setBytes(bytes);
            logger.info("Get the correspondent painting");
            Painting painting = paintingService.getPainting(id);
            picture.setPainting(painting);
            picture.setId(id);
            pictureService.AddPicture(picture);
        } catch (Exception e) {
            logger.error(e.toString());
            return ResponseEntity.badRequest().build();
        }
        return ResponseEntity.ok().build();
    }

}

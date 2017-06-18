package it.uniroma3.controller;

import it.uniroma3.message.MessageResponse;
import it.uniroma3.model.Author;
import it.uniroma3.service.AuthorService;
import it.uniroma3.service.PaintingService;
import it.uniroma3.service.PortraitService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by poldo on 06/06/17.
 */
@RestController
@RequestMapping("/authors")
public class AuthorController {
    private final AuthorService authorService;
    private final PaintingService paintingService;
    private final PortraitService portraitService;
    private final Logger logger = Logger.getLogger(AuthorController.class);

    @Autowired
    public AuthorController(AuthorService authorService, PaintingService paintingService, PortraitService portraitService) {
        this.authorService = authorService;
        this.paintingService = paintingService;
        this.portraitService = portraitService;
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Author> getAuthors() {
        logger.info("Requested all Authors");
        return authorService.getAll();
    }

    @RequestMapping(value = "/id/{id}", method = RequestMethod.GET)
    public Author getAuthor(@PathVariable Long id) {
        logger.info("Requested Author by id");
        return authorService.getAuthor(id);
    }

    @RequestMapping(value = "/name/{name}", method = RequestMethod.GET)
    public List<Author> getAuthorsByName(@PathVariable String name) {
        logger.info("Requested Authors by name");
        return authorService.getAuthorsByName(name);
    }

    @RequestMapping(value = "/surname/{surname}", method = RequestMethod.GET)
    public List<Author> getAuthorsBySurname(@PathVariable String surname) {
        logger.info("Requested Authors by name");
        return authorService.getAuthorsBySurname(surname);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<?> addAuthor(@Validated @RequestBody Author author, BindingResult bindingResult) {
        logger.info("Request to add Author");
        if(bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body(bindingResult.getAllErrors());
        }
        try {
        	Author authorAdded = authorService.addAuthor(author);
        	return ResponseEntity.ok(authorAdded);
        }
        catch(DataIntegrityViolationException e) {
        	List<MessageResponse> messages = new ArrayList<MessageResponse>();
        	messages.add(new MessageResponse("Author already exist"));
        	return ResponseEntity.badRequest().body(messages);
        }
        catch(Exception e) {
        	return ResponseEntity.badRequest().body("Unknown error");
        }
    }

    @RequestMapping(value = "/{name}", method = RequestMethod.POST)
    public ResponseEntity<?> addAuthorByName(@PathVariable String name) {
        logger.info("Request to add Author");
        Author newAuth = new Author();
        newAuth.setName(name);
        newAuth.setSurname("siw");
        newAuth.setBirthDate(new Date(System.currentTimeMillis()));
        authorService.addAuthor(newAuth);
        return ResponseEntity.ok().build();
    }

    @RequestMapping(value = "/id/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<?> removeAuthorById(@PathVariable Long id) {
        logger.info("Request to remove Author");
        paintingService.removePaintingsByAuthorId(id);
        portraitService.removePortraitByAuthorId(id);
        authorService.removeAuthorById(id);
        return ResponseEntity.ok().build();
    }

}

package it.uniroma3.controller;

import it.uniroma3.model.Author;
import it.uniroma3.service.AuthorService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

/**
 * Created by poldo on 06/06/17.
 */
@RestController
@RequestMapping("/authors")
public class AuthorController {
    private final AuthorService authorService;
    private final Logger logger = Logger.getLogger(AuthorController.class);

    @Autowired AuthorController(AuthorService authorService) {
        this.authorService = authorService;
    }

    @RequestMapping(method = RequestMethod.GET)
    public List<Author> getAuthors() {
        logger.info("Requested all Authors");
        return authorService.getAll();
    }

    @RequestMapping(value = "/{name}", method = RequestMethod.GET)
    public List<Author> getAuthorsByName(@PathVariable String name) {
        logger.info("Requested Authors by name");
        return authorService.getAuthorsByName(name);
    }

    @RequestMapping(value = "/{name}", method = RequestMethod.POST)
    public ResponseEntity<?> addAuthor(@PathVariable String name) {
        Author newAuth = new Author();
        newAuth.setName(name);
        newAuth.setSurname("siw");
        newAuth.setDateOfBirth(new Date(System.currentTimeMillis()));
        authorService.addAuthor(newAuth);
        return ResponseEntity.ok("Ok");
    }
}

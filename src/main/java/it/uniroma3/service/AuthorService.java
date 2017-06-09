package it.uniroma3.service;

import it.uniroma3.model.Author;
import it.uniroma3.repository.AuthorRepository;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by poldo on 31/05/17.
 */
@Service
public class AuthorService {
    private final AuthorRepository authorRepository;
    private final Logger logger = Logger.getLogger(AuthorService.class);

    @Autowired
    public AuthorService(AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }

    public List<Author> getAll() {
        logger.info("Get all Authors");
        return authorRepository.findAll();
    }

    public Author getAuthor(Long id) {
        logger.info("Get Author by id " + id);
        return authorRepository.findOne(id);
    }

    public List<Author> getAuthorsByName(String name) {
        logger.info("Get Authors by name " + name);
        return authorRepository.findAuthorsByName(name);
    }

    public List<Author> getAuthorsBySurname(String surname) {
        logger.info("Get Authors by surname " + surname);
        return authorRepository.findAuthorsBySurname(surname);
    }

    public Author addAuthor(Author author) {
        logger.info("Add author " + author.getName());
        return authorRepository.save(author);
    }
}

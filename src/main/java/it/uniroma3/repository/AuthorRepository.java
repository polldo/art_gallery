package it.uniroma3.repository;

import it.uniroma3.model.Author;

import java.util.List;

/**
 * Created by poldo on 05/06/17.
 */
public interface AuthorRepository extends GenericRepository<Author, Long> {

    public List<Author> findAuthorsByName(String name);

}

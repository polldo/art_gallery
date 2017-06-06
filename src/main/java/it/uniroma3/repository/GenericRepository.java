package it.uniroma3.repository;

import org.springframework.data.repository.NoRepositoryBean;
import org.springframework.data.repository.Repository;

import java.io.Serializable;
import java.util.List;

/**
 * Created by poldo on 05/06/17.
 */
@NoRepositoryBean
public interface GenericRepository<T, ID extends Serializable> extends Repository<T, ID> {

    public T save(T entity);

    public void delete(T entity);

    public List<T> findAll();

    public T findOne(ID id);

}

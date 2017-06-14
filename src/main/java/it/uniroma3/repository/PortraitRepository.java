package it.uniroma3.repository;

import it.uniroma3.model.Portrait;
import org.springframework.transaction.annotation.Transactional;

/**
 * Created by poldo on 14/06/17.
 */
public interface PortraitRepository extends GenericRepository<Portrait, Long> {
    @Transactional
    public void deletePortraitsByAuthor_Id(Long id);
}

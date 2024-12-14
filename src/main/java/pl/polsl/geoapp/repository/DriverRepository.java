package pl.polsl.geoapp.repository;

import org.springframework.data.repository.CrudRepository;
import pl.polsl.geoapp.model.DriverEntity;
import java.util.Optional;

public interface DriverRepository extends CrudRepository<DriverEntity, Integer> {
    public Optional<DriverEntity> findByUserEmail(String email);
}

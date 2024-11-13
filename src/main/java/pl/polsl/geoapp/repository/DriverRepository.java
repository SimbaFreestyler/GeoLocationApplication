package pl.polsl.geoapp.repository;

import org.springframework.data.repository.CrudRepository;
import pl.polsl.geoapp.model.DriverEntity;

public interface DriverRepository extends CrudRepository<DriverEntity, Integer> {
}

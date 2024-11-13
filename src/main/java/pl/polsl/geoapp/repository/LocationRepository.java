package pl.polsl.geoapp.repository;

import org.springframework.data.repository.CrudRepository;
import pl.polsl.geoapp.model.LocationEntity;

public interface LocationRepository extends CrudRepository<LocationEntity, Integer> {
}

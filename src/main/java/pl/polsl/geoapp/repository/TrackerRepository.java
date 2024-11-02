package pl.polsl.geoapp.repository;

import org.springframework.data.repository.CrudRepository;
import pl.polsl.geoapp.model.TrackerEntity;

public interface TrackerRepository extends CrudRepository<TrackerEntity, Integer> {
}

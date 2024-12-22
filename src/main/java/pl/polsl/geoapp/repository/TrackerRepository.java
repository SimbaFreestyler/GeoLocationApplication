package pl.polsl.geoapp.repository;

import org.springframework.data.repository.CrudRepository;
import pl.polsl.geoapp.model.TrackerEntity;
import pl.polsl.geoapp.service.TrackerService;

import java.util.List;

public interface TrackerRepository extends CrudRepository<TrackerEntity, String> {
    List<TrackerEntity> findAll();
}

package pl.polsl.geoapp.repository;

import org.springframework.data.repository.CrudRepository;
import pl.polsl.geoapp.model.TrackerEntity;

import java.util.List;

public interface TrackerRepository extends CrudRepository<TrackerEntity, String> {
    List<TrackerEntity> findAllByUser_Email(String email);

}

package pl.polsl.geoapp.repository;

import org.springframework.data.repository.CrudRepository;
import pl.polsl.geoapp.model.DriverEntity;

import java.util.List;

public interface DriverRepository extends CrudRepository<DriverEntity, Integer> {
    List<DriverEntity> findAllByUser_Email(String email);
}

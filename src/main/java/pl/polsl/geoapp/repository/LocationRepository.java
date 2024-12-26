package pl.polsl.geoapp.repository;

import org.springframework.data.repository.CrudRepository;
import pl.polsl.geoapp.model.LocationEntity;

import java.time.LocalDateTime;
import java.util.List;

public interface LocationRepository extends CrudRepository<LocationEntity, Integer> {
    List<LocationEntity> findAllByTracker_SerialNumber(String serialNumber);

    List<LocationEntity> findAllByTracker_SerialNumberAndTimestampAfterAndTimestampBefore(String serialNumber,
                                                                                          LocalDateTime start,
                                                                                          LocalDateTime end);
}

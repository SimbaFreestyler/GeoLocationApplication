package pl.polsl.geoapp.repository;

import org.springframework.data.repository.CrudRepository;
import pl.polsl.geoapp.model.UserEntity;

public interface UserRepository extends CrudRepository<UserEntity, String> {
}

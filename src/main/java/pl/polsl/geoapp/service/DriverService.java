package pl.polsl.geoapp.service;

import jakarta.transaction.Transactional;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import pl.polsl.geoapp.dto.driver.DriverRequest;
import pl.polsl.geoapp.dto.driver.DriverResponse;
import pl.polsl.geoapp.exceptions.AppException;
import pl.polsl.geoapp.model.DriverEntity;
import pl.polsl.geoapp.repository.DriverRepository;
import pl.polsl.geoapp.repository.UserRepository;

import java.util.stream.StreamSupport;

@Service
public class DriverService {

    private final DriverRepository driverRepository;
    private final UserRepository userRepository;

    public DriverService(DriverRepository driverRepository, UserRepository userRepository) {
        this.driverRepository = driverRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public DriverResponse createDriver(DriverRequest request, String email) {
        DriverEntity entity = new DriverEntity();
        entity.setName(request.getName());
        entity.setSurname(request.getSurname());
        entity.setUser(userRepository.findById(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email)));
        return DriverResponse.fromEntity(driverRepository.save(entity));
    }

    @Transactional
    public DriverResponse[] getDrivers(String email) {
        return driverRepository.findAllByUserEmail(email).stream()
                .map(DriverResponse::fromEntity)
                .toArray(DriverResponse[]::new);
    }
}

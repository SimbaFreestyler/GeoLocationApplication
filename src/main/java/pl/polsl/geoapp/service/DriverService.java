package pl.polsl.geoapp.service;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import pl.polsl.geoapp.dto.driver.DriverRequest;
import pl.polsl.geoapp.dto.driver.DriverResponse;
import pl.polsl.geoapp.model.DriverEntity;
import pl.polsl.geoapp.repository.DriverRepository;
import pl.polsl.geoapp.repository.UserRepository;

@Service
public class DriverService {

    private final DriverRepository driverRepository;
    private final UserRepository userRepository;

    public DriverService(DriverRepository driverRepository, UserRepository userRepository) {
        this.driverRepository = driverRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public DriverResponse createDriver(DriverRequest request) {
        DriverEntity entity = new DriverEntity();
        entity.setName(request.getName());
        entity.setSurname(request.getSurname());
        String email = request.getUser().getEmail();
        entity.setUser(userRepository.findById(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email)));
        return fromEntity(driverRepository.save(entity));
    }

    private DriverResponse fromEntity(DriverEntity entity) {
        DriverResponse response = new DriverResponse();
        response.setId(entity.getId());
        response.setName(entity.getName());
        response.setSurname(entity.getSurname());
        response.setUser(entity.getUser());
        return response;
    }
}

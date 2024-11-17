package pl.polsl.geoapp.service;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import pl.polsl.geoapp.dto.user.UserDriverRequest;
import pl.polsl.geoapp.dto.user.UserRequest;
import pl.polsl.geoapp.dto.user.UserResponse;
import pl.polsl.geoapp.exceptions.AppException;
import pl.polsl.geoapp.model.UserEntity;
import pl.polsl.geoapp.repository.UserRepository;

import java.nio.CharBuffer;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public UserResponse register(UserDriverRequest request) {
        Optional<UserEntity> checkEntity = userRepository.findById(request.getEmail());
        if(checkEntity.isPresent()) {
            throw new AppException("Account related to this account already exists", HttpStatus.BAD_REQUEST);
        }
        UserEntity entity = new UserEntity();
        entity.setEmail(request.getEmail());
        entity.setPassword(passwordEncoder.encode(CharBuffer.wrap(request.getPassword())));
        entity = userRepository.save(entity);

        return fromEntity(entity);
    }

    public UserResponse login(UserRequest request) {
        UserEntity user = userRepository.findById(request.getEmail())
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));

        if(passwordEncoder.matches(CharBuffer.wrap(request.getPassword()), user.getPassword())) {
            return fromEntity(user);
        }

        throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
    }

    public UserResponse findByEmail(String email) {
        UserEntity user = userRepository.findById(email)
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
        return fromEntity(user);
    }

    private UserResponse fromEntity(UserEntity entity) {
        UserResponse response = new UserResponse();
        response.setEmail(entity.getEmail());
        return response;
    }
}

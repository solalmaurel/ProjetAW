package fr.n7.entraide.facades;

import fr.n7.entraide.entities.User;
import fr.n7.entraide.repositories.UserRepository;
import fr.n7.entraide.utils.ResponseHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCrypt;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserFacade {

    @Autowired
    private UserRepository userRepository;

    @PostMapping(path = "/create", produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> createUser(@RequestBody User user) {
        Optional<User> userFound = userRepository.findByEmail(user.getEmail());
        if (userFound.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));
        userRepository.save(user);
        return ResponseHandler.generateResponse("User created successfully", HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable("id") long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        if(optionalUser.isEmpty()) throw new RuntimeException("User not found");
        return optionalUser.get();
    }

    @PostMapping("/login")
    public ResponseEntity<Object> loginUser(@RequestBody Map<String, String> credentials) {
        String typedPassword = credentials.get("password");

        Optional<User> userFound = userRepository.findByEmail(credentials.get("username"));

        if(userFound.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        String storedHashedPassword = userFound.get().getPassword();

        if(BCrypt.checkpw(typedPassword, storedHashedPassword)) {
            return ResponseEntity.ok(userFound.get());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }



}

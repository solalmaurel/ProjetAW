package fr.n7.entraide.facades;

import com.fasterxml.jackson.databind.ObjectMapper;

import fr.n7.entraide.entities.Adresse;
import fr.n7.entraide.entities.Facture;
import fr.n7.entraide.entities.User;
import fr.n7.entraide.repositories.UserRepository;
import fr.n7.entraide.utils.MailSender;
import fr.n7.entraide.utils.ResponseHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCrypt;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserFacade {

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @PostMapping(path = "/create", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> createUser(@RequestBody User user) {
        Optional<User> userFound = userRepository.findByEmail(user.getEmail());
        if (userFound.isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt()));
        userRepository.save(user);
        MailSender.sendWelcomeMail(user.getEmail(), user.getPrenom());
        return ResponseHandler.generateResponse("User created successfully", HttpStatus.OK);
    }

    @PostMapping(path = "/update", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> updateUser(@RequestBody User user) {

        System.out.println("HEHOOOOOOOOOOOOOOOOOOOOOOO " + user);

        Optional<User> userFound = userRepository.findByEmail(user.getEmail());
        if (userFound.isPresent() && BCrypt.checkpw(userFound.get().getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        userRepository.save(user);
        return ResponseHandler.generateResponse("User data updated successfully", HttpStatus.OK);
    }

    @PostMapping(path = "/delete", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> deleteUser(@RequestBody User user) {
        Optional<User> userFound = userRepository.findByEmail(user.getEmail());
        if (userFound.isPresent() && BCrypt.checkpw(userFound.get().getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        userRepository.delete(user);
        return ResponseHandler.generateResponse("User data removed successfully", HttpStatus.OK);
    }

    @PostMapping("/login")
    public ResponseEntity<Object> loginUser(@RequestBody Map<String, String> credentials) {
        String typedPassword = credentials.get("password");

        Optional<User> userFound = userRepository.findByEmail(credentials.get("username"));

        if (userFound.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        String storedHashedPassword = userFound.get().getPassword();

        if (BCrypt.checkpw(typedPassword, storedHashedPassword)) {
            return ResponseEntity.ok(userFound.get());
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }


    @PostMapping("/isBanned")
    public ResponseEntity<Object> isBanned(@RequestBody Map<String, String> infos) {
        String userId = infos.get("userId");

        Optional<User> userFound = userRepository.findById(Long.parseLong(userId));

        if(userFound.isPresent()){
            User user = userFound.get();
            return ResponseEntity.status(HttpStatus.OK).body(user.isBanned());

        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

    }

    
    @PostMapping("/ban")
    public ResponseEntity<Object> banUser(@RequestBody Map<String, Long> request) {
        Long userId = request.get("userId");
        Optional<User> userOptional = userRepository.findById(userId);

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        User user = userOptional.get();
        user.setBanned(true);
        userRepository.save(user);

        return ResponseHandler.generateResponse("User banned successfully", HttpStatus.OK);
    }


}

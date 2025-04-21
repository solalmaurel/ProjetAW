package fr.n7.entraide.facades;

import fr.n7.entraide.entities.User;
import fr.n7.entraide.repositories.UserRepository;
import fr.n7.entraide.utils.ResponseHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/user")
public class UserFacade {

    @Autowired
    private UserRepository userRepository;

    @PostMapping(path = "/create", produces=MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Object> createUser(@RequestBody User user) {
        userRepository.save(user);
        return ResponseHandler.generateResponse("User created successfully", HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public User getUser(@PathVariable("id") Long id) {
        Optional<User> optionalUser = userRepository.findById(id);
        if(optionalUser.isEmpty()) throw new RuntimeException("User not found");
        return optionalUser.get();
    }


}

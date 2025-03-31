package com.entraide.entraide;

import org.springframework.data.jpa.repository.JpaRepository;
import com.entraide.entraide.User;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}


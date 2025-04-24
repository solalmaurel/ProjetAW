package fr.n7.entraide.repositories;

import fr.n7.entraide.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String username);

    /**
     * Méthodes héritées de Jpa
     */
    // User save(User u);
    // Optional<User> findById(Long id);
    // Collection<User> findAll();
    // void delete(User u);
    // long count();
    // ...

}

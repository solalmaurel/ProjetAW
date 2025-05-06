package fr.n7.entraide.repositories;

import fr.n7.entraide.entities.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findByDiscussionIdDiscussionOrderByDateAsc(Long discussionId);
}
package fr.n7.entraide.facades;

import fr.n7.entraide.entities.Discussion;
import fr.n7.entraide.entities.Message;
import fr.n7.entraide.entities.User;
import fr.n7.entraide.repositories.DiscussionRepository;
import fr.n7.entraide.repositories.MessageRepository;
import fr.n7.entraide.repositories.UserRepository;
import fr.n7.entraide.utils.ResponseHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Sort;

@RestController
@RequestMapping("/discussion")
public class DiscussionController {

    private static final Logger logger = LoggerFactory.getLogger(DiscussionController.class);

    @Autowired
    private DiscussionRepository discussionRepository;

    @Autowired
    private MessageRepository messageRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/create")
    public ResponseEntity<Discussion> createDiscussion(@RequestBody DiscussionRequest discussionRequest) {
        logger.info("Received discussion creation request: sujet={}, description={}, userId={}",
                discussionRequest.getSujet(), discussionRequest.getDescription(), discussionRequest.getUserId());

        // Retrieve the user who is creating the discussion
        User user = userRepository.findById(discussionRequest.getUserId()).orElseThrow(() -> new RuntimeException("User not found"));

        // Create and save the discussion
        Discussion discussion = new Discussion();
        discussion.setSujet(discussionRequest.getSujet());
        discussion.setDateCreation(LocalDate.now());

        // Associate the user with the discussion
        discussion.setUser(user);
        // Save the discussion after setting the user
        discussionRepository.save(discussion);

        // Associate the user with the created discussion
        user.getDiscussionsCrees().add(discussion);
        userRepository.save(user);

        // Create and save the first message
        Message firstMessage = new Message();
        firstMessage.setDate(LocalDate.now());
        firstMessage.setMessage(discussionRequest.getDescription());
        firstMessage.setDiscussion(discussion);
        logger.info("Saving first message: {}", firstMessage.getMessage());
        messageRepository.save(firstMessage);

        // Associate the user with the created message
        user.getMessages().add(firstMessage);
        userRepository.save(user);

        return ResponseEntity.ok(discussion);
    }

    @GetMapping("/latest")
    public ResponseEntity<List<Discussion>> getLatestDiscussions() {
        List<Discussion> discussions = discussionRepository.findAll(Sort.by(Sort.Direction.DESC, "dateCreation"));
        return ResponseEntity.ok(discussions);
    }

    @GetMapping("/{id}/messages")
    public ResponseEntity<List<Message>> getMessagesByDiscussion(@PathVariable Long id) {
        List<Message> messages = messageRepository.findByDiscussionIdDiscussionOrderByDateAsc(id);
        return ResponseEntity.ok(messages);
    }

    // DTO for discussion creation
    public static class DiscussionRequest {
        private String sujet;
        private String description;
        private Long userId;

        public String getSujet() {
            return sujet;
        }

        public void setSujet(String sujet) {
            this.sujet = sujet;
        }

        public String getDescription() {
            return description;
        }

        public void setDescription(String description) {
            this.description = description;
        }

        public Long getUserId() {
            return userId;
        }

        public void setUserId(Long userId) {
            this.userId = userId;
        }
    }

    @PostMapping("/{id}/createMessage")
    public ResponseEntity<Message> createMessage(@RequestBody MessageRequest req) {
        logger.info("Received message creation request: message={}, userId={}, discussionId={}",
                req.getMessage(), req.getIdUser(), req.getIdDiscussion());
        User user = userRepository.findById(req.getIdUser()).orElseThrow();
        Discussion discussion = discussionRepository.findById(req.getIdDiscussion()).orElseThrow();

        Message message = new Message();
        message.setMessage(req.getMessage());
        message.setDate(LocalDate.now());
        message.setUser(user);
        message.setDiscussion(discussion);

        messageRepository.save(message);

        return ResponseEntity.ok(message);
    }

    public static class MessageRequest {
        private String message;
        private Long idUser;
        private Long idDiscussion;
        
        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }

        public Long getIdUser() {
            return idUser;
        }

        public void setIdUser(Long idUser) {
            this.idUser = idUser;
        }   

        public Long getIdDiscussion() {
            return idDiscussion;
        }
        
    }

    @GetMapping("/{id}")
    public ResponseEntity<Discussion> getDiscussionById(@PathVariable Long id) {
        Discussion discussion = discussionRepository.findById(id).orElseThrow();
        return ResponseEntity.ok(discussion);
    }

    @DeleteMapping("message/{id}")
    public ResponseEntity<Object> deleteMessage(@PathVariable("id") Long id) {
        messageRepository.deleteById(id);
        return ResponseHandler.generateResponse("Message deleted successfully", HttpStatus.OK);
    }

}
package com.scandela.server.controller;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.scandela.server.entity.User;
import com.scandela.server.exception.UserException;
import com.scandela.server.service.IEmailService;
import com.scandela.server.service.IUserService;

@RestController
@RequestMapping(value = "/users")
@CrossOrigin(origins = "*")
public class UserController extends AbstractController<User> {

	// Attributes \\
		// Protected \\
	@Autowired
	private IEmailService emailService;
	
	// Constructors \\
	protected UserController(IUserService userService) {
		super(userService);
	}

	// Methods \\
	// Public \\
	/**
	 * Get all users
	 * 
	 * @return allUsers
	 */
	@GetMapping
	public List<User> getUsers() {
		return super.getAll();
	}

	/**
	 * Get user by id
	 * 
	 * @param id
	 * @return user
	 */
	@GetMapping("/{id}")
	public User getUser(@PathVariable UUID id) {
		return super.get(id);
	}

	/**
	 * Create new user
	 * 
	 * @param newUser
	 * @return newUser
	 * @throws UserException 
	 */
	@PostMapping("/create")
	public User createUser(@RequestBody User newUser) throws Exception {
		emailService.sendMail(newUser.getEmail(), "Welcome to Scandela!",
				"Thank you for being a new member of Scandela !\n\n" +
				"To confirm your account, please click here : " +
				"https://dev.scandela.fr:2000/redirect?email=" +
				newUser.getEmail() + "\n\nTeam Scandela");
		return super.create(newUser);
	}
	
	@PostMapping("/signin")
	public Map<String, UUID> signIn(@RequestBody User user) throws UserException {
		UUID id = ((IUserService) service).signIn(user.getEmail(), user.getPassword());
		
		return Map.of("id", id);
	}

	/**
	 * Update user by id
	 * 
	 * @param id
	 * @param update
	 * @return
	 * @throws Exception
	 */
    @PutMapping("/{id}")
    public User updateUser(@PathVariable UUID id, @RequestBody User update) throws Exception {
        return super.update(id, update);
    }

	/**
	 * Delete user
	 * 
	 * @param id
	 */
	@DeleteMapping("/delete/{id}")
	public void deleteUser(@PathVariable UUID id) {
		super.delete(id);
	}
	
	@GetMapping("/test")
	public void test(/*@RequestBody String mailSubject, */@RequestBody String mailBody) throws Exception {//TODO voir comment mettre plusieurs requestbody pour assigner un nom
		emailService.sendMail("enzo.laurent@epitech.eu", "Scandela Newsletter", "");
	}

}

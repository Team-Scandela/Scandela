package com.scandela.server.exception;

public class UserException extends Exception {

	// Attributes \\
		// Public \\
	public static final String INCOMPLETE_INFORMATIONS = "Incomplete informations.";
	public static final String TOWN_LOADING = "Impossibility to load given town.";
	public static final String NO_CORRESPONDING_EMAIL = "No user for this email.";
	public static final String WRONG_PASSWORD = "Wrong password.";

		// Private \\
	private static final long serialVersionUID = 1L;
	
	// Constructors \\
	public UserException(String message) {
		super(message);
	}

}


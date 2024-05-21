package com.scandela.server.exception;

public class NotificationException extends Exception {

	// Attributes \\
		// Public \\
	public static final String INCOMPLETE_INFORMATIONS = "Incomplete informations.";
	public static final String USER_LOADING = "Impossibility to load given user.";

		// Private \\
	private static final long serialVersionUID = 1L;
	
	// Constructors \\
	public NotificationException(String message) {
		super(message);
	}

}

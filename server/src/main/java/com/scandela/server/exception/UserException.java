package com.scandela.server.exception;

public class UserException extends Exception {

	// Attributes \\
		// Public \\
	public static final String INCOMPLETE_INFORMATIONS = "Incomplete informations.";
	public static final String TOWN_LOADING = "Impossibility to load given town.";

		// Private \\
	private static final long serialVersionUID = 1L;
	
	// Constructors \\
	public UserException(String message) {
		super(message);
	}

}


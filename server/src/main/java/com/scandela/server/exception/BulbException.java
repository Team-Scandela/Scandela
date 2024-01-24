package com.scandela.server.exception;

public class BulbException extends Exception {

	// Attributes \\
		// Public \\
	public static final String INCOMPLETE_INFORMATIONS = "Incomplete informations.";

		// Private \\
	private static final long serialVersionUID = 1L;
	
	// Constructors \\
	public BulbException(String message) {
		super(message);
	}

}


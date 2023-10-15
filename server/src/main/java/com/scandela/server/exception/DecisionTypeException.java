package com.scandela.server.exception;

public class DecisionTypeException extends Exception {

	// Attributes \\
		// Public \\
	public static final String INCOMPLETE_INFORMATIONS = "Incomplete informations.";

		// Private \\
	private static final long serialVersionUID = 1L;
	
	// Constructors \\
	public DecisionTypeException(String message) {
		super(message);
	}

}


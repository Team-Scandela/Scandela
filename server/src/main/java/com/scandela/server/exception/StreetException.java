package com.scandela.server.exception;

public class StreetException extends Exception {

	// Attributes \\
		// Public \\
	public static final String INCOMPLETE_INFORMATIONS = "Incomplete informations.";
	public static final String HOOD_LOADING = "Impossibility to load given hood.";

		// Private \\
	private static final long serialVersionUID = 1L;
	
	// Constructors \\
	public StreetException(String message) {
		super(message);
	}

}


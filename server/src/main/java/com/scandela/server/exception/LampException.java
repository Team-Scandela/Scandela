package com.scandela.server.exception;

public class LampException extends Exception {

	// Attributes \\
		// Public \\
	public static final String INCOMPLETE_INFORMATIONS = "Incomplete informations.";
	public static final String TOWN_LOADING = "Impossibility to load given town.";
	public static final String STREET_LOADING = "Impossibility to load given street.";

		// Private \\
	private static final long serialVersionUID = 1L;
	
	// Constructors \\
	public LampException(String message) {
		super(message);
	}

}


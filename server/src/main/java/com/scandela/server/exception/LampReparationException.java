package com.scandela.server.exception;

public class LampReparationException extends Exception {

	// Attributes \\
		// Public \\
	public static final String INCOMPLETE_INFORMATIONS = "Incomplete informations.";
	public static final String LAMP_LOADING = "Impossibility to load given lamp.";
	public static final String ID_NOT_VALID = "The given id is not related to a lamp reparation.";

		// Private \\
	private static final long serialVersionUID = 1L;
	
	// Constructors \\
	public LampReparationException(String message) {
		super(message);
	}

}


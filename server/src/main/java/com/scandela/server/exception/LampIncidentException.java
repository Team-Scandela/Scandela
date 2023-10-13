package com.scandela.server.exception;

public class LampIncidentException extends Exception {

	// Attributes \\
		// Public \\
	public static final String INCOMPLETE_INFORMATIONS = "Incomplete informations.";
	public static final String INCIDENT_LOADING = "Impossibility to load given incident.";

		// Private \\
	private static final long serialVersionUID = 1L;
	
	// Constructors \\
	public LampIncidentException(String message) {
		super(message);
	}

}


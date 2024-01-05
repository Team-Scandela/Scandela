package com.scandela.server.exception;

public class LampDecisionException extends Exception {

	// Attributes \\
		// Public \\
	public static final String INCOMPLETE_INFORMATIONS = "Incomplete informations.";
	public static final String DECISION_LOADING = "Impossibility to load given decision.";
	public static final String LAMP_LOADING = "Impossibility to load given lamp.";

		// Private \\
	private static final long serialVersionUID = 1L;
	
	// Constructors \\
	public LampDecisionException(String message) {
		super(message);
	}

}


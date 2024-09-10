package com.scandela.server.exception;

public class DecisionException extends Exception {

	// Attributes \\
		// Public \\
	public static final String INCOMPLETE_INFORMATIONS = "Incomplete informations.";
	public static final String DECISIONTYPE_LOADING = "Impossibility to load given decision type.";
	public static final String USER_LOADING = "Impossibility to load given user.";
	public static final String GET_WEATHER = "Impossibility to get the weather.";

		// Private \\
	private static final long serialVersionUID = 1L;
	
	// Constructors \\
	public DecisionException(String message) {
		super(message);
	}

}


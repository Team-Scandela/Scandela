package com.scandela.server.exception;

public class LampException extends Exception {

	// Attributes \\
		// Public \\
	public static final String INCOMPLETE_INFORMATIONS = "Incomplete informations.";
	public static final String TOWN_LOADING = "Impossibility to load given town.";
	public static final String STREET_LOADING = "Impossibility to load given street.";
	public static final String BULB_LOADING = "Impossibility to load given bulb.";
	public static final String CABINET_LOADING = "Impossibility to load given cabinet.";
	public static final String LAMPSHADE_LOADING = "Impossibility to load given lampshade.";
	public static final String LAMP_NOT_FOUND = "Lamp not found.";

		// Private \\
	private static final long serialVersionUID = 1L;
	
	// Constructors \\
	public LampException(String message) {
		super(message);
	}

}


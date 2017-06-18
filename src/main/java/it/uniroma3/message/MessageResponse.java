package it.uniroma3.message;

public class MessageResponse {
	private String defaultMessage;
	
	public MessageResponse () {}
	
	public MessageResponse (String s) {
		this.defaultMessage = s;
	}

	public String getDefaultMessage() {
		return defaultMessage;
	}

	public void setDefaultMessage(String defaultMessage) {
		this.defaultMessage = defaultMessage;
	}
	
	
	
}

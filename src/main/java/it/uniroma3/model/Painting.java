package it.uniroma3.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Entity
public class Painting {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	@NotNull(message = "Title can't be null")
	@Size(min=1, message = "Title is required")
	private String title;
	@NotNull(message = "Height can't be null")
	private Integer height;
	@NotNull(message = "Width can't be null")
	private Integer width;
	@NotNull(message = "Medium can't be null")
	@Size(min=1, message = "Medium is required")
	private String medium;
	@NotNull(message = "Year can't be null")
	private Integer year;
	@NotNull(message = "Author can't be null")
	@ManyToOne
	private Author author;

	@ManyToOne
	private Room room;

	public Painting() {}
	
	public Long getId() {
		return id;
	}
	
	public void setId(Long id) {
		this.id = id;
	}
	
	public String getTitle() {
		return title;
	}
	
	public void setTitle(String title) {
		this.title = title;
	}
	
	public Integer getHeight() {
		return height;
	}

	public void setHeight(Integer height) {
		this.height = height;
	}

	public Integer getWidth() {
		return width;
	}

	public void setWidth(Integer width) {
		this.width = width;
	}

	public String getMedium() {
		return medium;
	}
	
	public void setMedium(String medium) {
		this.medium = medium;
	}
	
	public Integer getYear() {
		return year;
	}
	
	public void setYear(Integer year) {
		this.year = year;
	}

	public Author getAuthor() {
		return author;
	}

	public void setAuthor(Author author) {
		this.author = author;
	}

	public Room getRoom() {
		return room;
	}

	public void setRoom(Room room) {
		this.room = room;
	} 
	
}

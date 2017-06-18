package it.uniroma3.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import java.util.Date;

/**
 * Created by poldo on 31/05/17.
 */
@Entity
@Table(uniqueConstraints= @UniqueConstraint(columnNames={"name", "surname"}))
public class Author {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull(message = "Name can't be null")
    @Size(min=1, message = "Name is required")
    private String name;
    @NotNull(message = "Surname can't be null")
    @Size(min=1, message = "Surname is required")
    private String surname;
    @NotNull(message = "BirthDate can't be null")
    private Date birthDate;
    private Date deathDate;
    private String biography;

    public Author() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public Date getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(Date birthDate) {
        this.birthDate = birthDate;
    }

    public Date getDeathDate() {
        return deathDate;
    }

    public void setDeathDate(Date deathDate) {
        this.deathDate = deathDate;
    }

    public String getBiography() {
        return biography;
    }

    public void setBiography(String biography) {
        this.biography = biography;
    }
}

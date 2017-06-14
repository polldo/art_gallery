package it.uniroma3.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 * Created by poldo on 14/06/17.
 */
@Entity
public class Portrait {
    @Id
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    private Author author;

    @NotNull
    @Lob
    private byte[] bytes;

    public Portrait() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getBytes() {
        return bytes;
    }

    public void setBytes(byte[] bytes) {
        this.bytes = bytes;
    }

    public Author getAuthor() {
        return author;
    }

    public void setAuthor(Author author) {
        this.author = author;
    }
}

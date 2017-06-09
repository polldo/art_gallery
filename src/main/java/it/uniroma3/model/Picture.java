package it.uniroma3.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 * Created by poldo on 09/06/17.
 */
@Entity
public class Picture {
    @Id
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    private Painting painting;

    @NotNull
    @Lob
    private byte[] bytes;

    public Picture() {}

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

    public Painting getPainting() {
        return painting;
    }

    public void setPainting(Painting painting) {
        this.painting = painting;
    }
}

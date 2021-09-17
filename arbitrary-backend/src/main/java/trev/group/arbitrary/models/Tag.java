package trev.group.arbitrary.models;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tags")
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long tagid;
    private String type;
    private String value;

//
//    @ManyToMany
//    private List<Collectables> collectables = new ArrayList<>();

    /**
     * Default constructor used primarily by the JPA.
     */
    public Tag() {
    }

    public Tag(String type, String value) {
        this.type = type;
        this.value = value;
    }

    public long getTagid() {
        return tagid;
    }

    public void setTagid(long tagid) {
        this.tagid = tagid;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }
//
//    public List<Collectables> getCollectables() {
//        return collectables;
//    }
//
//    public void setCollectables(List<Collectables> collectables) {
//        this.collectables = collectables;
//    }
}

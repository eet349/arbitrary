package trev.group.arbitrary.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "usercollection")
public class UserCollection extends Auditable{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long usercollectionid;

    private String type;

    @OneToMany(mappedBy = "usercollection",
    cascade = CascadeType.ALL,
    orphanRemoval = true)
    @JsonIgnoreProperties(value = "usercollection")
    private List<Collectables> collectables = new ArrayList<>();

    @OneToOne
    private User user;

    /**
     * Default constructor used primarily by the JPA.
     */
    public UserCollection() {
    }

    public UserCollection(String type) {
        this.type = type;
    }

    public long getUsercollectionid() {
        return usercollectionid;
    }

    public void setUsercollectionid(long usercollectionid) {
        this.usercollectionid = usercollectionid;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<Collectables> getCollectables() {
        return collectables;
    }

    public void setCollectables(List<Collectables> collectables) {
        this.collectables = collectables;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}

package trev.group.arbitrary.models;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
 @Table(name = "collectables")
public class Collectables extends Auditable{
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long collectableid;

    private String name;
    private String type;
    private String link;
    @Lob
    @Column(name="description", columnDefinition = "LONGTEXT")
    private String description;
    private String image;
    private String thumbnail;

    private Integer minplayers;
    private Integer maxplayers;

    private Integer maxplaytime;
    private Integer playingtime;
    private Integer minage;

    private Integer yearpublished;

//    Tags
    @ManyToMany
    private List<Tag> tags = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "usercollectionid",
    nullable = false)
    @JsonIgnoreProperties(value = "collectables", allowSetters = true)
    private UserCollection usercollection;

    /**
     * Default constructor used primarily by the JPA.
     */
    public Collectables() {
    }

    public long getCollectableid() {
        return collectableid;
    }

    public void setCollectableid(long collectableid) {
        this.collectableid = collectableid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getLink() {
        return link;
    }

    public void setLink(String link) {
        this.link = link;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getThumbnail() {
        return thumbnail;
    }

    public void setThumbnail(String thumbnail) {
        this.thumbnail = thumbnail;
    }

    public Integer getMinplayers() {
        return minplayers;
    }

    public void setMinplayers(Integer minplayers) {
        this.minplayers = minplayers;
    }

    public Integer getMaxplayers() {
        return maxplayers;
    }

    public void setMaxplayers(Integer maxplayers) {
        this.maxplayers = maxplayers;
    }

    public Integer getMaxplaytime() {
        return maxplaytime;
    }

    public void setMaxplaytime(Integer maxplaytime) {
        this.maxplaytime = maxplaytime;
    }

    public Integer getPlayingtime() {
        return playingtime;
    }

    public void setPlayingtime(Integer playingtime) {
        this.playingtime = playingtime;
    }

    public Integer getMinage() {
        return minage;
    }

    public void setMinage(Integer minage) {
        this.minage = minage;
    }

    public Integer getYearpublished() {
        return yearpublished;
    }

    public void setYearpublished(Integer yearpublished) {
        this.yearpublished = yearpublished;
    }

    public List<Tag> getTags() {
        return tags;
    }

    public void setTags(List<Tag> tags) {
        this.tags = tags;
    }

    public UserCollection getUsercollection() {
        return usercollection;
    }

    public void setUsercollection(UserCollection usercollection) {
        this.usercollection = usercollection;
    }
}



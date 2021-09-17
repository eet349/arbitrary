package trev.group.arbitrary.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import trev.group.arbitrary.exceptions.ResourceNotFoundException;
import trev.group.arbitrary.models.Collectables;
import trev.group.arbitrary.models.Tag;
import trev.group.arbitrary.models.User;
import trev.group.arbitrary.repository.CollectablesRepository;
import trev.group.arbitrary.repository.UserRepository;

import java.util.ArrayList;
import java.util.List;

@Transactional
@Service(value = "collectablesService")
public class CollectablesServiceImpl implements CollectablesService{

    @Autowired
    private CollectablesRepository collectablesRepos;

    @Autowired
    private UserRepository userRepos;

    @Autowired
    private TagService tagService;

    @Override
    public List<Collectables> findAll() {
        List<Collectables> list = new ArrayList<>();

        collectablesRepos.findAll().iterator().forEachRemaining(list::add);
        return list;
    }

    @Override
    public List<Collectables> findByNameContaining(String name) {
        return collectablesRepos.findCollectablesByNameContainingIgnoreCase(name.toLowerCase());
    }

    @Override
    public Collectables findCollectablesByCollectableid(long collectableid) throws ResourceNotFoundException {
        return collectablesRepos.findById(collectableid).orElseThrow(() -> new ResourceNotFoundException("Collectable with id " + collectableid + "not found!"));
    }

    @Override
    public Collectables findByName(String name) {
        Collectables collectables = collectablesRepos.findByName(name.toLowerCase());
        if(collectables == null) {
            throw new ResourceNotFoundException("Collectables name " + name + " not found!");
        }

        return collectables;
    }

    @Transactional
    @Override
    public void delete(long collectableid) {
    collectablesRepos.findById(collectableid).orElseThrow(() -> new ResourceNotFoundException("Collectable with id: " + collectableid + " not found!"));
    collectablesRepos.deleteById(collectableid);
    }
    @Transactional
    @Override
    public Collectables save(long userid, Collectables collectable) {
        Collectables newCollectable = new Collectables();

        if(newCollectable.getCollectableid() != 0){
            collectablesRepos.findById(collectable.getCollectableid()).orElseThrow(() -> new ResourceNotFoundException("Collectable id " + collectable.getCollectableid() + " not found!"));
            newCollectable.setCollectableid(collectable.getCollectableid());
        }

        newCollectable.setName(collectable.getName());
        newCollectable.setType(collectable.getType());
        newCollectable.setLink(collectable.getLink());
        newCollectable.setDescription(collectable.getDescription());
        newCollectable.setImage(collectable.getImage());
        newCollectable.setThumbnail(collectable.getThumbnail());

        newCollectable.setMinplayers(collectable.getMinplayers());
        newCollectable.setMaxplayers(collectable.getMaxplayers());

        newCollectable.setMaxplaytime(collectable.getMaxplaytime());
        newCollectable.setPlayingtime(collectable.getPlayingtime());
        newCollectable.setMinage(collectable.getMinage());

        newCollectable.setYearpublished(collectable.getYearpublished());

        //tags
        newCollectable.getTags().clear();
        for(Tag tag : collectable.getTags()) {
            Tag newTag = tagService.save(new Tag(tag.getType(), tag.getValue()));
            newCollectable.getTags()
                    .add(newTag);
        }
        // usercollection
        User user =  userRepos.findById(userid).orElseThrow(() -> new ResourceNotFoundException("User with id: " + userid + " not found!"));
        newCollectable.setUsercollection(user.getCollection());
        return collectablesRepos.save(newCollectable);
    }
}

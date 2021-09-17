package trev.group.arbitrary.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import trev.group.arbitrary.exceptions.ResourceNotFoundException;
import trev.group.arbitrary.models.Collectables;
import trev.group.arbitrary.models.User;
import trev.group.arbitrary.models.UserCollection;
import trev.group.arbitrary.repository.UserCollectionRepository;

import java.util.List;

@Transactional
@Service(value = "usercollectionService")
public class UserCollectionServiceImpl implements UserCollectionService{
    @Autowired
    private UserCollectionRepository userCollectionRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private CollectablesService collectablesService;

    @Autowired
    private HelperFunctions helperFunctions;

    @Transactional
    @Override
    public UserCollection save(long userid, Collectables newcollectable) {
        User currentUser = userService.findUserById(userid);

        if(helperFunctions.isAuthorizedToMakeChange(currentUser.getUsername())) {
            UserCollection newUserCollection = new UserCollection();
            // need to change to initialize the collection with the first Collectables
            return userCollectionRepository.save(newUserCollection);
        } else {
            throw new ResourceNotFoundException("This user is not authorized to make changes.");
        }
    }

    @Override
    public UserCollection update(long userid, Collectables newcollectable) {
        User currentUser = userService.findUserById(userid);

        if (helperFunctions.isAuthorizedToMakeChange(currentUser.getUsername())) {
            UserCollection currentUserCollection = currentUser.getCollection();
            List<Collectables> collectablesList = currentUserCollection.getCollectables();
            collectablesList.add(collectablesService.save(userid, newcollectable));
            currentUserCollection.setCollectables(collectablesList);
            return userCollectionRepository.save(currentUserCollection);

        } else {
            throw new ResourceNotFoundException("This user is not authorized to make changes.");
        }

    }
}

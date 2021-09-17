package trev.group.arbitrary.services;

import trev.group.arbitrary.models.Collectables;
import trev.group.arbitrary.models.UserCollection;

public interface UserCollectionService {
    UserCollection save(long userid, Collectables newcollectable);
    UserCollection update(long userid, Collectables newcollectable);

}

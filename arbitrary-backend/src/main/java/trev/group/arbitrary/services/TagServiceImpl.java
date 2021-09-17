package trev.group.arbitrary.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import trev.group.arbitrary.models.Tag;
import trev.group.arbitrary.repository.TagRepository;

@Transactional
@Service(value = "tagService")
public class TagServiceImpl implements TagService {
    @Autowired
    private TagRepository tagRepos;

    @Override
    public Tag save(Tag tag) {
        Tag newTag = new Tag(tag.getType(), tag.getValue());

        return tagRepos.save(newTag);
    }
}

const router = require('express').Router();
const { Tag, Product } = require('../../models');

// The `/api/tags` endpoint


  // find all tags
  // be sure to include its associated Product data
  router.get("/", async (req, res) => {
    try {
      const tagData = await Tag.findAll({
        include: [{ model: Product}],
      });
      res.status(200).json(tagData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // find a single tag by its `id`
  // be sure to include its associated Product data
  router.get("/:id", async (req, res) => {
    try {
      const tagData = await Tag.findByPk(req.params.id, {
        include: [{ model: Product }],
      });
  
      if (!tagData) {
        res.status(404).json({ message: "No tag found with that id!" });
        return;
      }
  
      res.status(200).json(tagData);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  // create a new tag
  router.post('/', async (req, res) => {
    /* req.body should look like this...
    {
      "tag_name": "country music",
    }
  */
    try {
      const tagData = await Tag.create({
        tag_name: req.body.tag_name,
      });
      res.status(200).json(tagData);
    } catch (err) {
      res.status(400).json(err);
    }
  });

  // update a tag's name by its `id` value
  router.put('/:id', (req, res) => {
    //Calls the update method on the Tag model
    Tag.update(
      {
        // All the fields you can update and the data attached to the request body.
        tag_name: req.body.tag_name,
      },
      {
        // Gets a Tag based on the id given in the request parameters
        where: {
          id: req.params.id,
        },
      }
    )
      .then((updatedTag) => {
        res.json({message: 'tag updated!'});
      })
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  });

  // delete on tag by its `id` value
  router.delete('/:id', (req, res) => {
    // Looks for the tag id given in the request parameters
    Tag.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then((deletedTag) => {
        res.json({message:'tag deleted!'});
      })
      .catch((err) => res.json(err));
  });

module.exports = router;

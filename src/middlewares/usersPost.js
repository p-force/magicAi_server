const { Post } = require('../../db/models');

module.exports = function (req, res, next) {
  Post
    .findByPk(req.params.postId)
    .then((post) => {
      if (post.userId === req.session.user.id) {
        next();
      } else {
        res.status(403).json({ msg: 'Unauthorized' });
      }
    })
    .catch((err) => res.status(400).json({ msg: err.message }));
};

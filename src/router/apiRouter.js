const router = require("express").Router();
const { User } = require("../../db/models");

router.post("/saveUserData", async (req, res) => {
  console.log(req.body);
  try {
    const [userData, created] = await User.findOrCreate({
      where: { address: req.body.address },
      defaults: { ...req.body },
    });

    if (!created) {
      await User.update(
        { ...req.body },
        {
          where: { address: req.body.address },
        }
      );
    }
    res.sendStatus(200);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.get("/getUserData", async (req, res) => {
  try {
    const { address } = req.body;

    const userData = await User.findOne({ where: { address } });
    res.json(userData);
  } catch (e) {
    res.sendStatus(500);
  }
});

router.get("/getLiderBoardData", async (req, res) => {
  try {
    const data = await User.findAll({
      where: {},
      limit: 100,
      order: [
        ["points_total", "DESC"],
        // ["refferal_points", "DESC"],
      ], // Сортировка по points_total в порядке убывания, затем по referal_points в порядке убывания
    });

    res.json(data);
  } catch (e) {
    res.sendStatus(500);
  }
});

module.exports = router;

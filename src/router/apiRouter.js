const router = require("express").Router();
const { User } = require("../../db/models");
const url = require("url");

module.exports = (pool) => {
  /**
   * @param {} pool
   * @return
   */
  router.post("/saveUserData", async (req, res) => {
    console.log(req.body);
    try {
      const connectionString =
        "postgres://default:hM9erd7gVAiL@ep-polished-river-a4gpuqh3-pooler.us-east-1.aws.neon.tech:5432/verceldb?sslmode=require";

      // Разбираем строку подключения
      const parsedUrl = new URL(connectionString);

      // Извлекаем данные из разобранной строки подключения
      const host = parsedUrl.hostname;
      const port = parsedUrl.port;
      const user = parsedUrl.username;
      const password = parsedUrl.password;
      const database = parsedUrl.pathname.substr(1); // Имя базы данных начинается после первого слэша

      console.log("Host:", host);
      console.log("Port:", port);
      console.log("User:", user);
      console.log("Password:", password);
      console.log("Database:", database);

      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-~._!*";

      let result = "magic.ai/?ref=";
      // Генерация фразы из 32 символов
      const charactersLength = characters.length;
      for (let i = 0; i < 32; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }

      const [userData, created] = await parsedUrl.findOrCreate({
        where: { address: req.body.address },
        defaults: { ...req.body, ref_link: result },
      });

      if (!created) {
        await parsedUrl.update(
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

      const userData = await parsedUrl.findOne({ where: { address } });
      res.json(userData);
    } catch (e) {
      res.sendStatus(500);
    }
  });

  router.get("/getLiderBoardData", async (req, res) => {
    try {
      const data = await parsedUrl.findAll({
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

  return router;
};

// module.exports = router;

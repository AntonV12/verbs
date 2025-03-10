import { pool } from "../config/database.js";
import { parseFileContent } from "../middlewares/parseFileContent.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { shuffle } from "../middlewares/shuffleArray.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const parseVerbs = async (req, res) => {
  try {
    const existingVerbs = await pool.execute("SELECT * FROM verbs");
    if (existingVerbs[0].length) return res.status(200).json({ message: "Data already exists" });
    const sql = "INSERT INTO verbs (verb, translates, examples) VALUES (?, ?, ?)";

    const filePath = path.join(__dirname, "verbs");
    const files = await fs.promises.readdir(filePath);

    const result = [];

    for (const file of files) {
      const fileContent = await fs.promises.readFile(path.join(filePath, file), "utf-8");

      const parsedData = parseFileContent(fileContent);

      for (const elem of parsedData) {
        const { verb, translates, examples } = elem;

        const examplesRes = examples
          .flatMap((sentence) => sentence.split(". "))
          .map((sentence) => sentence.trim());
        const translatesRes = translates
          .map((translate) => translate.split(", "))
          .flat()
          .map((translate) => translate.trim());
        result.push({ verb, translates: translatesRes, examples: examplesRes });
      }
    }

    shuffle(result).forEach((item) => {
      pool.execute(sql, [item.verb, JSON.stringify(item.translates), JSON.stringify(item.examples)]);
    });

    res.status(200).json({ message: "Data inserted successfully" });
  } catch (err) {
    console.error("Ошибка:", err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

export const getVerbs = async (req, res) => {
  const { limit, portion, isExam } = req.query;

  try {
    const length = await pool.execute("SELECT COUNT(*) as count FROM verbs");
    if (isExam) {
      const minus = +portion - 5;
      const start = (+portion - 5) * (+limit + 1) - minus;
      const [results] = await pool.execute(`SELECT * FROM verbs LIMIT ${limit * 5} OFFSET ${start}`);

      res.status(200).json({ results, length: length[0][0].count });
    } else {
      const [results] = await pool.execute(
        `SELECT * FROM verbs LIMIT ${limit} OFFSET ${limit * (portion - 1)}`
      );
      res.status(200).json({ results, length: length[0][0].count });
    }
  } catch (err) {
    console.error("Ошибка:", err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

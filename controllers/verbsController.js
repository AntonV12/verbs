import { pool } from "../config/database.js";
import { parseFileContent } from "../middlewares/parseFileContent.js";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import { shuffle } from "../middlewares/shuffleArray.js";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const parseVerbs = async (req, res) => {
  try {
    const sql = "INSERT INTO verbs (verb, translates, examples) VALUES (?, ?, ?)";

    const filePath = path.join(__dirname, "verbs");
    const files = await fs.promises.readdir(filePath);

    const result = [];

    for (const file of files) {
      const fileContent = await fs.promises.readFile(path.join(filePath, file), "utf-8");

      const parsedData = parseFileContent(fileContent);

      for (const elem of parsedData) {
        const { verb, translates, examples } = elem;

        const res = examples.flatMap((sentence) => sentence.split(". ")).map((sentence) => sentence.trim());
        result.push({ verb, translates, examples: res });
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
  try {
    const [results] = await pool.execute("SELECT * FROM verbs");

    res.status(200).json(results);
  } catch (err) {
    console.error("Ошибка:", err);
    res.status(500).json({ error: "Ошибка сервера" });
  }
};

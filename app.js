import express from "express";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import verbsRoutes from "./routes/verbs.js";

const app = express();
const port = 3000;

const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(express.static(path.join(__dirname, "client", "dist")));
app.use(express.json());

app.use("/verbs", verbsRoutes);

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});

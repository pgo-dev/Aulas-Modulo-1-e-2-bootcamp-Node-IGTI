import express from "express";
import rotasMarcas from "./routes/rotasmarcas.js";

const app = express();
app.use(express.json());
app.use("/marcas", rotasMarcas);
app.listen(3000, () => console.log("API started!"));

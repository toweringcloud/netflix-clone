import { fileURLToPath } from "url";
import { join } from "path";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.static(join(__dirname, "dist")));

app.use((_, res) => {
	res.sendFile(join(__dirname, "dist", "index.html"));
});

const portNo = process.env.PORT_NO || 3000;
const svcNm = process.env.SVC_NM || "custom";
app.listen(portNo, () =>
	console.log(
		`${svcNm} ui preview on following\n➜  Local:   http://localhost:${portNo}`
	)
);

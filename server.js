const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

const port = 3002;
const supplierPort = 3003;
const supplierUrl = `http://localhost:${supplierPort}`;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/call-supplier", async (req, res) => {
  try {
    console.log(JSON.stringify(req.body));

    const response = await axios.post(`${supplierUrl}/rpc`, {
      method: "JSONServer.CreateSupplierRequest",
      params: [req.body],
      id: 1,
    });

    res.json(response.data.result);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erro ao chamar o ms-supplier", details: error.message });
  }
});

app.listen(port, () => {
  console.log(`ms-inventory rodando na porta ${port}`);
});

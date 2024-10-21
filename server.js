const express = require("express");
const { JSONRPCClient } = require("jsonrpc-client");

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
    const response = await axios.post(`${supplierUrl}/jsonrpc`, {
      jsonrpc: "2.0",
      method: "SupplierMethod",
      params: req.body,
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

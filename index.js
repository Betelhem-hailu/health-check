const express = require('express');
const app = express();
const PORT = 5000;
app.get("/health", (req, res) => {
    res.status(200).send("OK");
  });

  app.listen(PORT, () => {
    console.log(`Express server running at http://localhost:${PORT}`);
  });
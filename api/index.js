import express from "express";
import fs from "node:fs";
import { productos } from "./data.js";

const app = express();

app.use(express.json());
app.use(express.static("public"));

const appInfo = {
  client_id: 19568,
  client_secret: "79f3449e947c0920a7d334eca74349aad0574323600568f1",
  grant_type: "authorization_code",
  code: "",
};

function saveAccount(newData) {
  try {
    let data = fs.readFileSync("./accounts.json", "utf-8");
    const json = JSON.parse(data);
    json.push(newData);
    fs.writeFileSync("./accounts.json", JSON.stringify(json, null, 2));
  } catch (error) {
    console.log("Error writing account:", error);
  }
}

function init(data) {
  productos.map((prod) => {
    fetch(`https://api.tiendanube.com/v1/${data.user_id}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authentication: `bearer ${data.access_token}`,
        "User-Agent": "prueba (joackomdp2006@gmail.com)",
      },
      body: JSON.stringify(prod),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  });
}

app.get("/", (req, res) => {
  res.send("Hola");
});

app.get("/auth", (req, res) => {
  const { code } = req.query;
  console.log(code);

  appInfo.code = code;

  fetch("https://www.tiendanube.com/apps/authorize/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(appInfo),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      saveAccount(data);
      init(data);
    })
    .catch((error) => console.log(error));

  res.send("Bien");
});

app.get("/acc", (req, res) => {
  const accounts = fs.readFileSync("./public/accounts.json", "utf-8");
  res.send(JSON.parse(accounts));
});

app.post("/prod", (req, res) => {
  const accounts = JSON.parse(fs.readFileSync("accounts.json", "utf-8"));

  accounts.map((acc) => {
    fetch(`https://api.tiendanube.com/v1/${acc.user_id}/products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authentication: `bearer ${acc.access_token}`,
        "User-Agent": "prueba (joackomdp2006@gmail.com)",
      },
      body: JSON.stringify(req.body),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  });
  res.send("Productos creados");
});

app.listen(3000, "0.0.0.0", () => {
  console.log("http://localhost:3000");
});

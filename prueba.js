import express from "express"

const app = express()

const appInfo = {
    client_id: 19568,
    client_secret: "79f3449e947c0920a7d334eca74349aad0574323600568f1",
    grant_type: "authorization_code",
    code: ""
}

app.get("/", (req, res) => {
    res.send("Hola")
})

app.get("/auth", (req, res) => {
    const { code } = req.query
    console.log(code)

    appInfo.code = code

    fetch("https://www.tiendanube.com/apps/authorize/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(appInfo) 
    }).then(res => res.json()).then(data => console.log(data)).catch(error => console.log(error))

    res.send(code)
})

app.listen(3000, () => {
    console.log("http://localhost:3000")
})
import express from "express"

const app = express()

app.use(express.json())

app.get("/", async (req, res) => {
     const response = await fetch("https://api.tiendanube.com/v1/6487073/products", {
        method: "GET",
        headers: {
            "Authentication": "bearer 1648fc74d18dd982082d6d4e99246c329b36f932",
            "User-Agent": "prueba (joackomdp2006@gmail.com)"
        }
    })

    const data = await response.json()

    res.send(data)
})

app.post("/product", async (req, res) => {
    const response = await fetch("https://api.tiendanube.com/v1/6487073/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authentication": "bearer 1648fc74d18dd982082d6d4e99246c329b36f932",
            "User-Agent": "prueba (joackomdp2006@gmail.com)"
        },
        body: JSON.stringify(req.body)
    })

    const data = await response.json()

    res.send(data)
})

app.listen(3000, () => {
    console.log("http://localhost:3000")
})



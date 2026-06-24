import fastify from "fastify";
import jsonFormula from "./repository/formula-one.json"
const server = fastify({logger:true})

server.get("/", async(req, res)=>{
    res.type("Application/json").code(200)
    return jsonFormula
})

server.get("/pilots", async(req, res)=>{

    const data = jsonFormula.map(time => time.pilotos).flat()

    res.type("Application/json").code(200)
    return data
})

server.listen({port:3333},()=>{
    console.log("server porta 3333");
})
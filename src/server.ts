import fastify from "fastify";
import jsonFormula from "./repository/formula-one.json"
import cors from "@fastify/cors"

const server = fastify({logger:true})

server.register(cors, {
    origin: "*"
})


server.get("/", async(req, res)=>{
    res.type("Application/json").code(200)
    return jsonFormula
})

server.get("/pilots", async(req, res)=>{

    const data = jsonFormula.map(time => time.pilotos).flat()

    res.type("Application/json").code(200)
    return data
})

server.get("/equipes", async(req,res)=>{
    const data = jsonFormula.map( time => time.equipe )
    res.type("Application/json").code(200)
    return data
})

server.get<{ Params: { search: string } }>("/:search", async (req, res) => {
    const search = req.params.search
    const searchResultEquip = jsonFormula.find((e) => e.equipe === search)
    const searchResultDriver = jsonFormula.find((d) => d.pilotos.includes(search))
    const searchResult = searchResultEquip ?? searchResultDriver

    res.type("application/json").code(200)
    return searchResult ?? { message: 'Not found' }
})

server.listen({port:3333},()=>{
    console.log("server porta 3333");
})
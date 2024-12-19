const express = require("express")
const mongoose = require('mongoose')
const cors = require("cors");


const app = express()
app.use(cors());
app.use(express.json())
const port = 3000

const Empresa = mongoose.model('Empresa', 
    { 
        name: String,
        cnpj: String,
        site: String,
        endereco: String,
        telefone: String,
        email: String,
        instagram: String,
        produto: String,
        valorProduto: Number,
    });

app.get("/", async (req, res) => {
    try {
        const empresas = await Empresa.find(); 
        res.json(empresas); 
    } catch (error) {
        console.error("Error fetching empresas:", error);
        res.status(500).send("Error fetching empresas");
    }
})

app.delete("/:id", async (req, res) =>{
    const empresa = await Empresa.findByIdAndDelete(req.params.id)
    return res.send(empresa)
})

app.put('/:id', async (req, res) => {
    const empresa = await Empresa.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        cnpj: req.body.cnpj,
        site: req.body.site,
        endereco: req.body.endereco,
        telefone: req.body.telefone,
        email: req.body.email,
        instagram: req.body.instagram,
        produto: req.body.produto,
        valorProduto: req.body.valorProduto,
    })

    return res.send(empresa)
}, )

app.post('/', async (req, res) => {
    try {
    const empresa = new Empresa({
        name: req.body.name,
        cnpj: req.body.cnpj,
        site: req.body.site,
        endereco: req.body.endereco,
        telefone: req.body.telefone,
        email: req.body.email,
        instagram: req.body.instagram,
        produto: req.body.produto,
        valorProduto: req.body.valorProduto,
    })
    await empresa.save()
    return res.status(201).json(empresa);

} catch (error) {
        console.error("Error saving to database:", error);
        res.status(500).send("An error occurred");
    }
})

app.listen(port, () => {
  console.log('App running');

  mongoose.connect('mongodb+srv://adminPedro:12983476@welldatabase.nhgkw.mongodb.net/?retryWrites=true&w=majority&appName=WellDataBase')
})
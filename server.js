const express = require("express");
const app = express();
const port = 3000;
const connectdb=require("./database")
connectdb()
const env = require ("dotenv").config()
app.use(express.json())
const subcategorieRoute=require("./Routes/subcategorieRoute")
app.use("/subcategorie",subcategorieRoute)
const categorieRoute=require("./Routes/categorierouter")
app.use("/categorie",categorieRoute)
const productRoute=require("./Routes/ProductRoute")
app.use("/product",productRoute)
const adminroute=require("./Routes/adminroute")
app.use("/admin",adminroute)
const providerroute=require("./Routes/providerroute")
app.use("/provider",providerroute)
const customerroute=require("./Routes/customerroute")
app.use("/customer",customerroute)
const orderroute=require("./Routes/orderRoute")
const factureRoute=require("./Routes/factureRoute")
app.use("/facture",factureRoute)
app.use("/order",orderroute)
const userroute=require("./Routes/userroute")
app.use("/user",userroute)
const commanderoute=require("./Routes/CommandeRoute")
app.use("/commande",commanderoute)
//upplod les images
app.get('/:img',(req,res)=>{
  res.sendFile(__dirname+"/Storage/"+req.params.img)
})
app.listen(port, () => {
    console.log(`Application exemple à l'écoute sur le port ${port}!`);
  });

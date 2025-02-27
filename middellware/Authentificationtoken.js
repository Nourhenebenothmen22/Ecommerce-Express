const  jwt  = require("jsonwebtoken");
const authentificationToken=(req,res,next)=>{
    //le token JWT de l'en-tête Authorization.
    //Le token est généralement envoyé sous la forme Bearer <token>,
    // donc on le sépare avec .split(' ')[1].
    const token=req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    if(!token){
        return res.status(403).json({message:'Token manquant, accès interdit.'})
    }
    jwt.verify(token,process.env.rtoken,(err,user)=>{
        if(err){
            return res.status(403).json({ message: 'Token invalide ou expiré.' });
        }
        req.user = user;
        next();
    })
}
module.exports=authentificationToken




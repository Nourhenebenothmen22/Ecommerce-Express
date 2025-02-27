const mongoose = require("mongoose");

const CommandeSchema = new mongoose.Schema({
  date: {
    type: Date
  },
  etat: {
    type: String,
    enum: ["en cours", "en préparation", "expédié", "livré", "annulé"]
  },
  lieulivraison: {
    type: String

  },
  typelivraison: {
    type: String
  },
  deliveryPrice: {
    type: Number,
    min: 0, 
  },
   customer:{
          type:mongoose.Types.ObjectId,
          ref:'customer'
      },
         Orders:[{
                      type:mongoose.Types.ObjectId,
                      ref:'order'
                  }],
                  facture: {
                    type: mongoose.Types.ObjectId,
                    ref: 'facture'
                }
  
})

module.exports = mongoose.model("Commande", CommandeSchema); 
const mongoose = require("mongoose");

const CommandeSchema = new mongoose.Schema({
  date: {
    type: Date, 
  },
  etat: {
    type: String,
    enum: ["en cours", "en préparation", "expédié", "livré", "annulé"], 
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
});

module.exports = mongoose.model("Commande", CommandeSchema); // Use "Commande" as the model name
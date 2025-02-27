
const { validationResult, body, param } = require("express-validator");
const validateAttribut = (fields) => {
    const validations = fields.map((field) => {
        switch (field) {
         case "id":
                return param('id')
                    .notEmpty().withMessage({ name: "id", message: "L'ID est requis" })
                    .isInt({ min: 1 }).withMessage({ name: "id", message: "L'ID doit être un entier positif" });
            case "price":
                return body('price')
                    .notEmpty().withMessage({ name: "price", message: "Le prix ne doit pas être vide" })
                    .isFloat({ gt: 0 }).withMessage({ name: "price", message: "Le prix doit être un nombre positif" });
            case "qte":
                return body('qte')
                    .notEmpty().withMessage({ name: "qte", message: "La quantité ne doit pas être vide" })
                    .isInt({ min: 0 }).withMessage({ name: "qte", message: "La quantité doit être un nombre positif" });
            case "ref":
                return body('ref')
                    .notEmpty().withMessage({ name: "ref", message: "La référence ne doit pas être vide" })
                    .isLength({ min: 3 }).withMessage({ name: "ref", message: "La référence doit contenir au moins 3 caractères" });
            case "description":
                return body('description')
                    .optional()
                    .isLength({ max: 500 }).withMessage({ name: "description", message: "La description ne doit pas dépasser 500 caractères" });
            case "image":
                return body('image')
                    .notEmpty().withMessage({ name: "image", message: "L'image est obligatoire" })
                    .isURL().withMessage({ name: "image", message: "L'image doit être une URL valide" });
            default:
                return null;
        }
    }).filter(Boolean);
    return [
        ...validations,
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                 const formattedErrors = errors.array().map(err => ({
                    name: err.path,
                    message: err.msg.message || err.msg
                }));
                return res.status(400).json({ errors: formattedErrors });
            }
            next();
        }
    ];
};
module.exports = validateAttribut;







const express = require('express');
const router = express.Router();
const db = require('../database');
const { body, validationResult } = require('express-validator');
// POST seguro con validación y sanitización
router.post('/',
  body('email').isEmail().normalizeEmail(),
  body('name').not().isEmpty().trim().escape(), 
  body('password').isLength({ min: 5 }),
  (req, res) => {
    // Verifica errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    
    const sql = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.run(sql, [name, email, password], function (err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(201).json({ id: this.lastID, name, email });
    });
  }
);  
module.exports = router;

// SEGURO: Utiliza una consulta parametrizada
router.get('/:id', (req, res) => {
 const sql = 'SELECT * FROM users WHERE id =?';
 const params = [req.params.id];
 db.get(sql, params, (err, row) => {
 if (err) {
 return res.status(500).json({ error: err.message });
 }
 if (!row) {
 return res.status(404).json({ error: 'Usuario no encontrado' });
 }
 res.json(row);
 });
});

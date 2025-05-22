// controllers/seguimientos.controller.js
const db = require('../db');

const getSeguimientos = async (req, res) => {
  const { visitante_id } = req.params;
  try {
    const [rows] = await db.query('SELECT * FROM seguimientos WHERE visitante_id = ?', [visitante_id]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener seguimientos' });
  }
};

const addSeguimiento = async (req, res) => {
  const { visitante_id, tipo, descripcion, realizado_por } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO seguimientos (visitante_id, tipo, descripcion, realizado_por) VALUES (?, ?, ?, ?)',
      [visitante_id, tipo, descripcion, realizado_por]
    );
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar seguimiento' });
  }
};

module.exports = { getSeguimientos, addSeguimiento };
// controllers/seguimientos.controller.js
const db = require('../db');

const db = require('../db');
// controllers/seguimientos.controller.js
const getSeguimientos = async (req, res) => {
  const { visitante_id } = req.params;
  try {
    const query = `
      SELECT s.id, s.visitante_id, s.tipo, s.descripcion, s.fecha,
             u.nombre AS realizado_por
      FROM seguimientos s
      LEFT JOIN usuarios u ON s.realizado_por = u.id
      WHERE s.visitante_id = ?
      ORDER BY s.fecha DESC
    `;
    const [rows] = await db.query(query, [visitante_id]);
    res.json(rows);
  } catch (error) {
    console.error('🔥 Error en getSeguimientos:', error);
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
    console.error('🔥 Error en addSeguimiento:', error);
    res.status(500).json({ error: 'Error al agregar seguimiento' });
  }
};

module.exports = { getSeguimientos, addSeguimiento };

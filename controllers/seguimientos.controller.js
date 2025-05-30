// controllers/seguimientos.controller.js

const db = require('../db');

const getSeguimientos = async (req, res) => {
  const { visitante_id } = req.params;
  try {
    const query = `
      SELECT s.*, u.nombre AS usuario_nombre
      FROM seguimientos s
      LEFT JOIN usuarios u ON s.realizado_por = u.id
      WHERE s.visitante_id = ?
      ORDER BY s.fecha DESC
    `;
    const [rows] = await db.query(query, [visitante_id]);
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

const updateSeguimiento = async (req, res) => {
  const { id } = req.params;
  const { tipo, descripcion, realizado_por } = req.body;
  try {
    await db.query(
      'UPDATE seguimientos SET tipo=?, descripcion=?, realizado_por=? WHERE id=?',
      [tipo, descripcion, realizado_por, id]
    );
    res.json({ message: 'Seguimiento actualizado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar seguimiento' });
  }
};

const deleteSeguimiento = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM seguimientos WHERE id=?', [id]);
    res.json({ message: 'Seguimiento eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar seguimiento' });
  }
};

module.exports = { getSeguimientos, addSeguimiento, updateSeguimiento, deleteSeguimiento };

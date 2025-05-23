//controllers/visitantes.controller.js
// controllers/visitantes.controller.js
const db = require('../db');

// Obtener visitantes interesados en un producto específico
const obtenerVisitantesPorProducto = async (req, res) => {
  const { producto_id } = req.params;

  try {
    const query = `
      SELECT v.*
      FROM visitantes v
      INNER JOIN visitantes_productos vp ON v.id = vp.visitante_id
      WHERE vp.producto_id = ?
      ORDER BY v.fecha_registro DESC
    `;

    const [rows] = await db.query(query, [producto_id]);
    res.json(rows);
  } catch (error) {
    console.error('🔥 Error en obtenerVisitantesPorProducto:', error);
    res.status(500).json({ error: 'Error al obtener visitantes por producto' });
  }
};


const obtenerVisitantes = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM visitantes ORDER BY fecha_registro DESC');
    res.json(rows);
  } catch (error) {
    console.error('🔥 Error en obtenerVisitantes:', error);
    res.status(500).json({ error: 'Error al obtener visitantes' });
  }
};

const crearVisitante = async (req, res) => {
  const { nombre_completo, correo, telefono, empresa, cargo, notas, usuario_id } = req.body;
  try {
    const [result] = await db.query(
      'INSERT INTO visitantes (nombre_completo, correo, telefono, empresa, cargo, notas, usuario_id) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [nombre_completo, correo, telefono, empresa, cargo, notas, usuario_id]
    );
    res.status(201).json({ id: result.insertId });
  } catch (error) {
    console.error('🔥 Error en crearVisitante:', error);
    res.status(500).json({ error: 'Error al crear visitante' });
  }
};


module.exports = {
  obtenerVisitantesPorProducto,
  obtenerVisitantes,
  crearVisitante
};
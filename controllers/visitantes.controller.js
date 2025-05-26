//controllers/visitantes.controller.js

const db = require('../db');

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
  console.log('Datos recibidos:', req.body);
  const { nombre_completo, correo, telefono, empresa, cargo, notas } = req.body;

  if (!nombre_completo || !correo || !telefono) {
    return res.status(400).json({ error: 'nombre_completo, correo y telefono son obligatorios.' });
  }

  try {
    const [result] = await db.query(
      `INSERT INTO visitantes (nombre_completo, correo, telefono, empresa, cargo, notas) VALUES (?, ?, ?, ?, ?, ?)`,
      [nombre_completo, correo, telefono, empresa, cargo, notas]
    );
    res.status(201).json({ id: result.insertId, message: 'Visitante creado correctamente' });
  } catch (error) {
    console.error('🔥 Error en crearVisitante:', error);
    res.status(500).json({ error: error.message || 'Error al crear visitante' });
  }
};



const asignarProductosAVisitante = async (req, res) => {
  const { visitante_id, productos } = req.body;

  if (!Array.isArray(productos) || productos.length === 0) {
    return res.status(400).json({ error: 'Debe enviar un arreglo de productos' });
  }

  try {
    await db.query('DELETE FROM visitantes_productos WHERE visitante_id = ?', [visitante_id]);

    const placeholders = productos.map(() => '(?, ?)').join(', ');
    const flattenedValues = productos.flatMap(producto_id => [visitante_id, producto_id]);

    const sql = `INSERT INTO visitantes_productos (visitante_id, producto_id) VALUES ${placeholders}`;

    await db.query(sql, flattenedValues);

    res.status(200).json({ message: 'Productos asignados correctamente' });
  } catch (error) {
    console.error('🔥 Error en asignarProductosAVisitante:', error);
    res.status(500).json({ error: 'Error al asignar productos' });
  }
};

const obtenerProductosDeVisitante = async (req, res) => {
  const { visitante_id } = req.params;

  try {
    const query = `
      SELECT p.*
      FROM productos p
      INNER JOIN visitantes_productos vp ON p.id = vp.producto_id
      WHERE vp.visitante_id = ?
    `;
    const [rows] = await db.query(query, [visitante_id]);
    res.json(rows);
  } catch (error) {
    console.error('🔥 Error en obtenerProductosDeVisitante:', error);
    res.status(500).json({ error: 'Error al obtener productos del visitante' });
  }
};

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

module.exports = {
  obtenerVisitantes,
  crearVisitante,
  asignarProductosAVisitante,
  obtenerProductosDeVisitante,
  obtenerVisitantesPorProducto
};
// Este archivo contiene las funciones del controlador para manejar las operaciones relacionadas con los visitantes
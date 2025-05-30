//controllers/visitantes.controller.js

const db = require('../db');
const ExcelJS = require('exceljs');

const obtenerVisitantes = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT v.*, GROUP_CONCAT(p.nombre SEPARATOR ', ') AS productos_interes
      FROM visitantes v
      LEFT JOIN visitantes_productos vp ON v.id = vp.visitante_id
      LEFT JOIN productos p ON vp.producto_id = p.id
      GROUP BY v.id
      ORDER BY v.fecha_registro DESC
    `);
    res.json(rows);
  } catch (error) {
    console.error('Error obtenerVisitantes:', error);
    res.status(500).json({ error: 'Error al obtener visitantes' });
  }
};

const crearVisitante = async (req, res) => {
  const { nombre_completo, correo, telefono, empresa, cargo, notas } = req.body;
  try {
    const [result] = await db.query(
      `INSERT INTO visitantes (nombre_completo, correo, telefono, empresa, cargo, notas) VALUES (?, ?, ?, ?, ?, ?)`,
      [nombre_completo, correo, telefono, empresa, cargo, notas]
    );
    res.status(201).json({ id: result.insertId, message: 'Visitante creado correctamente' });
  } catch (error) {
    console.error('Error crearVisitante:', error);
    res.status(500).json({ error: 'Error al crear visitante' });
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
    console.error('Error en obtenerProductosDeVisitante:', error);
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
    console.error('Error en obtenerVisitantesPorProducto:', error);
    res.status(500).json({ error: 'Error al obtener visitantes por producto' });
  }
};


const actualizarVisitante = async (req, res) => {
  const { id } = req.params;
  const { nombre_completo, correo, telefono, empresa, cargo, notas, estado } = req.body;
  try {
    await db.query(
      `UPDATE visitantes SET nombre_completo=?, correo=?, telefono=?, empresa=?, cargo=?, notas=?, estado=? WHERE id=?`,
      [nombre_completo, correo, telefono, empresa, cargo, notas, estado, id]
    );
    res.json({ message: 'Visitante actualizado correctamente' });
  } catch (error) {
    console.error('Error actualizarVisitante:', error);
    res.status(500).json({ error: 'Error al actualizar visitante' });
  }
};

const eliminarVisitante = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query('DELETE FROM visitantes WHERE id = ?', [id]);
    res.json({ message: 'Visitante eliminado correctamente' });
  } catch (error) {
    console.error('Error eliminarVisitante:', error);
    res.status(500).json({ error: 'Error al eliminar visitante' });
  }
};

const exportarVisitantesExcel = async (req, res) => {
  try {
    const [rows] = await db.query(`
      SELECT v.*, GROUP_CONCAT(p.nombre SEPARATOR ', ') AS productos_interes
      FROM visitantes v
      LEFT JOIN visitantes_productos vp ON v.id = vp.visitante_id
      LEFT JOIN productos p ON vp.producto_id = p.id
      GROUP BY v.id
      ORDER BY v.fecha_registro DESC
    `);

    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Visitantes');

    sheet.columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Nombre Completo', key: 'nombre_completo', width: 30 },
      { header: 'Correo', key: 'correo', width: 30 },
      { header: 'Teléfono', key: 'telefono', width: 20 },
      { header: 'Empresa', key: 'empresa', width: 25 },
      { header: 'Cargo', key: 'cargo', width: 20 },
      { header: 'Estado', key: 'estado', width: 15 },
      { header: 'Productos de Interés', key: 'productos_interes', width: 50 },
      { header: 'Notas', key: 'notas', width: 40 },
      { header: 'Fecha Registro', key: 'fecha_registro', width: 25 },
    ];

    rows.forEach(row => {
      sheet.addRow(row);
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename=visitantes.xlsx');

    await workbook.xlsx.write(res);
    res.end();
  } catch (error) {
    console.error('Error exportarVisitantesExcel:', error);
    res.status(500).json({ error: 'Error al exportar visitantes' });
  }
};

module.exports = {
  obtenerVisitantes,
  crearVisitante,
  actualizarVisitante,
  eliminarVisitante,
  asignarProductosAVisitante, // si ya tienes
  obtenerProductosDeVisitante,
  obtenerVisitantesPorProducto,
  exportarVisitantesExcel,
};
// Este archivo contiene las funciones del controlador para manejar las operaciones relacionadas con los visitantes
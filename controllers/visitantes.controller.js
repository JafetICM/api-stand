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
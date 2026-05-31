const { validationResult } = require('express-validator');
const projectService = require('../services/projectService');

const create = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const payload = req.body;
    const project = await projectService.createProject(payload);
    res.status(201).json(project);
  } catch (err) { next(err); }
};

const list = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, status, client, priority, assignedTo } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (client) filter.client = client;
    if (priority) filter.priority = priority;
    if (assignedTo) filter.team = assignedTo;
    const result = await projectService.getProjects(filter, { page: Number(page), limit: Number(limit) });
    res.json(result);
  } catch (err) { next(err); }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const project = await projectService.getProjectById(id);
    if (!project) return res.status(404).json({ message: 'Project not found' });
    // compute progress and add related metadata
    const progress = project.progress || 0;
    res.json({ ...project.toObject(), progress });
  } catch (err) { next(err); }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updated = await projectService.updateProject(id, req.body);
    if (!updated) return res.status(404).json({ message: 'Project not found' });
    res.json(updated);
  } catch (err) { next(err); }
};

const updateStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const updated = await projectService.updateStatus(id, status);
    if (!updated) return res.status(404).json({ message: 'Project not found' });
    res.json(updated);
  } catch (err) { next(err); }
};

const createMilestone = async (req, res, next) => {
  try {
    const { id } = req.params;
    const milestone = req.body;
    const created = await projectService.addMilestone(id, milestone);
    res.status(201).json(created);
  } catch (err) { next(err); }
};

const updateMilestone = async (req, res, next) => {
  try {
    const { id, mid } = req.params;
    const updated = await projectService.updateMilestone(id, mid, req.body);
    res.json(updated);
  } catch (err) { next(err); }
};

module.exports = { create, list, getById, update, updateStatus, createMilestone, updateMilestone };

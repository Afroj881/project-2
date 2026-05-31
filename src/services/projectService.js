const Project = require('../models/Project');

const createProject = async (data) => {
  const project = new Project(data);
  await project.save();
  return project;
};

const getProjects = async (filter = {}, options = {}) => {
  const { page = 1, limit = 20, sort = '-createdAt' } = options;
  const skip = (page - 1) * limit;
  const query = Project.find(filter)
    .populate('client')
    .populate('team')
    .sort(sort)
    .skip(skip)
    .limit(limit);
  const [items, total] = await Promise.all([query.exec(), Project.countDocuments(filter)]);
  return { items, total, page, limit };
};

const getProjectById = async (id) => {
  return Project.findById(id).populate('client').populate('team').exec();
};

const updateProject = async (id, data) => {
  return Project.findByIdAndUpdate(id, data, { new: true }).populate('client').populate('team');
};

const updateStatus = async (id, status) => {
  return Project.findByIdAndUpdate(id, { status }, { new: true }).populate('client').populate('team');
};

const addMilestone = async (projectId, milestone) => {
  const project = await Project.findById(projectId);
  if (!project) throw new Error('Project not found');
  project.milestones.push(milestone);
  await project.save();
  return project.milestones[project.milestones.length - 1];
};

const updateMilestone = async (projectId, milestoneId, data) => {
  const project = await Project.findById(projectId);
  if (!project) throw new Error('Project not found');
  const m = project.milestones.id(milestoneId);
  if (!m) throw new Error('Milestone not found');
  Object.assign(m, data);
  if (data.status === 'Completed') m.completedAt = new Date();
  await project.save();
  return m;
};

module.exports = {
  createProject,
  getProjects,
  getProjectById,
  updateProject,
  updateStatus,
  addMilestone,
  updateMilestone
};

const mongoose = require('mongoose');

const milestoneSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed', 'On Hold'], default: 'Pending' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  completedAt: { type: Date }
}, { timestamps: true });

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  client_id: { type: String },
  description: { type: String },
  startDate: { type: Date },
  deadline: { type: Date },
  budget: { type: Number },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  team: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  status: { type: String, enum: ['Pending', 'In Progress', 'Completed', 'On Hold', 'Cancelled'], default: 'Pending' },
  milestones: [milestoneSchema],
  metadata: { type: mongoose.Schema.Types.Mixed }
}, { timestamps: true });

projectSchema.virtual('progress').get(function() {
  if (!this.milestones || this.milestones.length === 0) return 0;
  const completed = this.milestones.filter(m => m.status === 'Completed').length;
  return Math.round((completed / this.milestones.length) * 100);
});

projectSchema.set('toJSON', { virtuals: true });
projectSchema.set('toObject', { virtuals: true });

module.exports = mongoose.model('Project', projectSchema);

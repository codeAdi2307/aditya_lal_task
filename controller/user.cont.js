import Task from "../model/task.model.js";

export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const userId = req.user._id; 
    const task = await Task.create({ title, description, userId });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const editTask = async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    const userId = req.user._id;
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId }, 
      { title, description, completed },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const viewAllTask = async (req, res) => {
  try {
    const userId = req.user._id;
    const tasks = await Task.find({ userId });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const viewSingleTask = async (req, res) => {
  try {
    const userId = req.user.id;
    const task = await Task.findOne({ _id: req.params.id, userId });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const userId = req.user._id;
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

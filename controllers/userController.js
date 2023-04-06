const User = require('../model/User');

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().populate("articles");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createUser = async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
  });
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(id, req.body, { new: true });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// Get articles by user ID
exports.getArticlesByUserId = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id).populate('articles');
    res.status(200).json(user.articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create article for user
exports.createArticleForUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const article = new Article({ title, description });
    await article.save();
    const user = await User.findById(id);
    user.articles.push(article);
    await user.save();
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const Article = require('../model/Article');

exports.getArticles = async (req, res) => {
  try {
    const articles = await Article.find();
    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createArticle = async (req, res) => {
  const article = new Article({
    title: req.body.title,
    description: req.body.description,
  });
  try {
    const newArticle = await article.save();
    res.status(201).json(newArticle);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateArticle = async (req, res) => {
  const { id } = req.params;
  try {
    const article = await Article.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(article);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteArticle = async (req, res) => {
  const { id } = req.params;
  try {
    await Article.findByIdAndDelete(id);
    res.status(200).json({ message: "Article deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
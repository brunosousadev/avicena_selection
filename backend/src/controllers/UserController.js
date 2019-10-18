const User = require('../models/User');

module.exports = {
  async index(req, res) {
    const users = await User.findAll();

    return res.json(users);
  },
  async show(req, res) {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (user) {
      return res.json(user);
    } else {
      return res.json({ Infor: `User with id ${id} does not exist` });
    }


  },
  async update(req, res) {
    const { first, last } = req.body;
    const { id } = req.params;

    let user = await User.findByPk(id);
    if (user) {
      user = await User.update({ first, last }, { returning: true, where: { id: id } });
    } else {
      return res.status(204).json({ Infor: `User with id ${id} does not exist` });
    }

    return res.json(user);

  },
  async store(req, res) {
    const { first, last } = req.body;
    const user = await User.create({ first, last });

    return res.json(user);
  },

  async destroy(req, res) {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (user) {
      await user.destroy();
      return res.status(204).json();
    } else {
      return res.json({ Infor: `User with id ${id} does not exist` });
    }
  }
};
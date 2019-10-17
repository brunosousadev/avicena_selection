const User = require('../models/User');

module.exports = {
  async index(req, res) {
    const users = await User.findAll();

    return res.json(users);
  },
  async show(req, res) {
    const { id } = req.params;
    const user = await User.findByPk(id);

    return res.json(user);
  },
  async update(req, res) {
    const { first, last } = req.body;
    const { id } = req.params;

    const user  = await User.update(
      {first, last},
      {returning: true, where: {id : id}});

    console.log(await User.findByPk(id));

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
    await user.destroy();

    return res.status(204).json();
  }
};
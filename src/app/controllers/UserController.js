import User from "../models/User.js";

export default class UserController {
  static async store(req, res) {
    try {
      const { name, email, password } = req.body;

      const newUser = {
        name: name,
        email: email,
        password: password,
      };
      console.log(newUser);

      await User.create(newUser);

      res.status(200).send({ message: "Usuário Criado Com Sucesso" });
    } catch (error) {
      res.status(500).send(error.message);
    }
  }
}

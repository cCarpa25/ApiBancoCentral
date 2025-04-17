import User from "../models/User.js";

export default class UserController {
  static async store(req, res) {
    try {
      const data = req.body;

      const schema = Yup.object().shape({
        name: Yup.string().required(),
        email: Yup.string().email().required(),
        password: Yup.string().min(8).required(),
      });

      if (!(await schema.isValid(data))) {
        res.status(400).send({ message: "Falha na Validação" });
      }

      const userExists = await User.findOne({ where: { email: data.email } });

      if (userExists) {
        res
          .status(400)
          .send({ message: "Já Existe um Usuário com esse email" });
      }

      const { name, email, password } = data;
      const newUser = { name, email, password };

      await User.create(newUser);

      res.status(200).send({ message: "Usuário Criado com Sucesso" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  }
}

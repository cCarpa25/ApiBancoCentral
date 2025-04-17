// src/app/controllers/UserController.js
import User from "../models/User.js";

class UserController {
  // Lista todos os usuários
  async index(req, res) {
    try {
      const users = await User.findAll({
        attributes: ['id', 'name'], // agora mostra 'id' também
      });
      return res.status(200).json(users);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao listar usuários." });
    }
  }

  // Mostra um usuário específico
  async show(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id, {
        attributes: ['id', 'name', 'email'], // seleciona só os campos desejados
      });
  
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }
  
      return res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao buscar usuário." });
    }
  }
  // Cria um novo usuário
  async store(req, res) {
    const { name, email, password } = req.body;
  
    try {
      // Criação do novo usuário
      const user = await User.create({
        name,
        email,
        password,
      });
  
      // Resposta personalizada com a mensagem de sucesso
      return res.status(201).json({ message: "Usuário criado com sucesso" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao criar usuário." });
    }
  }

  // Atualiza um usuário
  async update(req, res) {
    const { id } = req.params;
    const { name, email, password } = req.body;

    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }

      // Atualiza o usuário
      await user.update({ name, email, password });
      return res.status(200).json(user); // Retorna o usuário atualizado
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao atualizar usuário." });
    }
  }

  // Deleta um usuário
  async delete(req, res) {
    const { id } = req.params;

    try {
      const user = await User.findByPk(id);
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado." });
      }

      // Deleta o usuário
      await user.destroy();
      return res.status(204).send(); // Sem conteúdo, apenas confirmação
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao deletar usuário." });
    }
  }
}

export default new UserController();

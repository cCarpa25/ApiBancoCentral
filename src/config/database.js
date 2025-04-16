export default {
  dialect: "postgres",
  host: "localhost", // Docker mapeia para sua máquina
  port: 5432,
  username: "postgres",
  password: "senha123",
  database: "minibanco",
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};

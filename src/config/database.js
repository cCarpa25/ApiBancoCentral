module.exports = {
  dialect: 'postgres',
  host: 'localhost', // Docker mapeia para sua máquina
  port: 5432,
  username: 'minibanco_user',
  password: 'minibanco_pass',
  database: 'minibanco',
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};

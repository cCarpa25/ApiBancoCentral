import { Model, DataTypes } from 'sequelize';

class Transacao extends Model {
  static init(sequelize) {
    super.init(
      {
        tipo: DataTypes.ENUM('credito', 'debito'),
        valor: DataTypes.DECIMAL,
        descricao: DataTypes.STRING,
        data: DataTypes.DATE,
      },
      {
        sequelize,
        tableName: 'transacoes',
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Conta, { foreignKey: 'conta_id', as: 'conta' });
  }
}

export default Transacao;

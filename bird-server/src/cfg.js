exports.appCfg = {
  port: 7001,
};

exports.sequelizeCfg = {
  dialect: "mysql",
  host: "119.91.206.236",
  port: 3306,
  username: "root",
  password: "beer-code-2024",
  database: "bird",
  timezone: "+08:00",
  define: {
    timestamps: true,
    paranoid: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
    deletedAt: "deleted_at",
    underscored: true,
  },
  dialectOptions: {
    dateStrings: true,
    typeCast: true,
  },
};

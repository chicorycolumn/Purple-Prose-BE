const { DB_URL } = process.env;

const ENV = process.env.NODE_ENV || "development";
//This checks the environment choice.
const baseConfig = {
  client: "pg",
  migrations: {
    directory: "./db/migrations"
  },
  //Migrations creates the Schema.
  seeds: {
    directory: "./db/seeds"
  }
  //Seed populates that schema with data.
};

// And this below is what figures the environment choice.
const customConfig = {
  production: {
    connection: `${DB_URL}?ssl=true`
  },
  development: {
    connection: {
      database: "nc_news",
      user: "heihachu",
      password: "showcalves"
    }
  },
  test: {
    connection: {
      database: "nc_news_test",
      user: "heihachu",
      password: "showcalves"
    }
  }
};

//Here we export which data set based on environment choice.
module.exports = { ...customConfig[ENV], ...baseConfig };
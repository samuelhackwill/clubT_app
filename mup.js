module.exports = {
  servers: {
    one: {
      host: 'vps227501.ovh.net',
      username: 'root'
      // pem:
      // password:
      // or leave blank for authenticate from ssh-agent
    }
  },

  meteor: {
    name: 'devone',
    path: '../',
    docker: {
      image: 'abernix/meteord:base', // (optional)
    },
    servers: {
      one: {}
    },
    buildOptions: {
      serverOnly: true,
    },
    env: {
      PORT: 3002,
      ROOT_URL: 'http://esad.se',
      MONGO_URL: 'mongodb://localhost:23768/devone'
    },

    //dockerImage: 'kadirahq/meteord'
    deployCheckWaitTime: 60
  },

  mongo: {
    oplog: true,
    port: 27017,
    servers: {
      one: {},
    },
  },
};

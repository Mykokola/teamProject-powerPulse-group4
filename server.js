const setupConectionMongoDb =  require("./src/utils/mobogDbConection");
(async () => {
    await setupConectionMongoDb();
 require('./src');
})();
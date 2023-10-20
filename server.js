const setupConectionMongoDb =  require("./src/untils/mobogDbConection");
(async () => {
    await setupConectionMongoDb();
 require('./src');
})();
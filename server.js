const setupConection =  require("./src/untils/mobogDbConection");
(async () => {
    await setupConection();
 require('./src');
})();
const userRouter = require("./userRouter");
const productRouter = require("./productRouter");

function routes(app){

    app.use("/user", userRouter);
    app.use("/product", productRouter);
    
};

module.exports = routes;
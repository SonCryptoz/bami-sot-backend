const userRouter = require("./userRouter");

function routes(app){

    app.use("/user", userRouter);
    
};

module.exports = routes;
module.exports = {
    multipleMongooseToObject: function(mongooseArray){
        return mongooseArray.map(mongooseObject => mongooseObject.toObject());
    },
    mongooseToObject: function(mongooseObject){
        return mongooseObject ? mongooseObject.toObject() : mongooseObject;
    }
};
const errorHander = (err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.json({ message: err.message, stacktrace: err.stack });
};

module.exports = errorHander;
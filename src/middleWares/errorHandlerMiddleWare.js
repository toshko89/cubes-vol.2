exports.errorHandler = function (error, req, res, next) {
    if (error) {
        res.locals.errors = error;
        return res.status(404).render('404', error);
    }

    next();
}
const boom = require('@hapi/boom');
const config = require('../../../config/');

function checkApiKey(req, res, next) {
    const apiKey = req.headers['api'];
    if (apiKey === config.apiKey) {
        next();
    } else {
        next(boom.unauthorized());
    }
}

function checkAdminRole(req, res, next) {
    const user = req.user;
    if (user.role === 'admin') {
        next();
    } else {
        next(boom.forbidden('Se requiere permisos de administrador'));
    }
}


function checkRoles(...roles) {
    return (req, res, next) => {
        const user = req.user;
        if (roles.includes(user.role)) {
            next();
        } else {
            next(boom.forbidden('No posee permiso para acceder a este Contenido'));
        }
    }
}

module.exports = {
    checkApiKey,
    checkAdminRole,
    checkRoles
}
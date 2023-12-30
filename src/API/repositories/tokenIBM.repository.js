const connection = require('../../../libs/connectMySQL.SDC');

async function updateAccessToken(id, accessToken) {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE TOKEN_IBM SET access_token = ? WHERE id = ?';
        connection.query(query, [content, id], (err, res) => {
            if(err) {
                reject(err);
            }else{
                resolve(res.affectedRows);
            }
        });
    });
}

module.exports = {
    updateAccessToken
};
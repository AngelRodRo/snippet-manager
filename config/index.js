const dev = require("./dev");
const local = require("./local");
const production = require("./production");

const getURI = ({ host, port, dbname, user = "", password = "" }) => {
    const uri = "mongodb://";
    const defaultUri = `${host}:${port}/${dbname}`;

    const hasCredentials = user && password;
    
    if (hasCredentials) {
        return `${uri}${user}:${password}@${defaultUri}`;
    }

    return `${uri}${defaultUri}`;
};

module.exports = (function () {
    const env = process.env.ENV;

    let config = {}
    let dbConfig;

    switch (env) {
        case "development": 
            config = dev;
            dbConfig = dev.db;
        break;
        default: 
            config = local;
            dbConfig = local.db;
        break;
    }

    config.dbURI = getURI(dbConfig);
    return config;
})()
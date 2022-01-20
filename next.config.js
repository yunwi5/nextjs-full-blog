const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

module.exports = (phase) => {
    // For Development Server Configuration
    if (phase === PHASE_DEVELOPMENT_SERVER) {
        return {
            env: {
                mongodb_username: 'yunkeun',
                mongodb_password: '001009jyk',
                mongodb_clustername: 'cluster1',
                mongodb_database: 'my-blog'
            }
        }
    }

    // For Production Server Configuration 
    return {
        env: {
            mongodb_username: 'yunkeun',
            mongodb_password: '001009jyk',
            mongodb_clustername: 'cluster1',
            mongodb_database: 'my-blog'
        }
    }
};
const path = require('path');
const fs = require('fs-extra');
const _ = require('lodash');

/**
 * transform all relative paths to absolute paths
 * @TODO: re-write this function a little bit so we don't have to add the parent path - that is hard to understand
 *
 * Path must be string.
 * Path must match minimum one / or \
 * Path can be a "." to re-present current folder
 */
const makePathsAbsolute = function makePathsAbsolute(obj, parent) {
    const self = this;

    _.each(obj, function (configValue, pathsKey) {
        if (_.isObject(configValue)) {
            makePathsAbsolute.bind(self)(configValue, parent + ':' + pathsKey);
        } else if (
            _.isString(configValue) &&
            (configValue.match(/\/+|\\+/) || configValue === '.') &&
            !path.isAbsolute(configValue)
        ) {
            self.set(parent + ':' + pathsKey, path.normalize(path.join(__dirname, '../../..', configValue)));
        }
    });
};

const doesContentPathExist = function doesContentPathExist() {
    if (!fs.pathExistsSync(this.get('paths:contentPath'))) {
        // new Error is allowed here, as we do not want config to depend on @tryghost/error
        // @TODO: revisit this decision when @tryghost/error is no longer dependent on all of ghost-ignition
        // eslint-disable-next-line no-restricted-syntax
        throw new Error('Your content path does not exist! Please double check `paths.contentPath` in your custom config file e.g. config.production.json.');
    }
};

/**
* Check if the URL in config has a protocol and sanitise it if not including a warning that it should be changed
*/
const checkUrlProtocol = function checkUrlProtocol() {
    const url = this.get('url');

    if (!url.match(/^https?:\/\//i)) {
        // new Error is allowed here, as we do not want config to depend on @tryghost/error
        // @TODO: revisit this decision when @tryghost/error is no longer dependent on all of ghost-ignition
        // eslint-disable-next-line no-restricted-syntax
        throw new Error('URL in config must be provided with protocol, eg. "http://my-ghost-blog.com"');
    }
};

/**
 * nconf merges all database keys together and this can be confusing
 * e.g. production default database is sqlite, but you override the configuration with mysql
 *
 * this.clear('key') does not work
 * https://github.com/indexzero/nconf/issues/235#issuecomment-257606507
 */
const sanitizeDatabaseProperties = function sanitizeDatabaseProperties() {
    const database = this.get('database');

    if (this.get('database:client') === 'mysql') {
        delete database.connection.filename;
    } else {
        delete database.connection.host;
        delete database.connection.user;
        delete database.connection.password;
        delete database.connection.database;
    }

    this.set('database', database);
};

module.exports = {
    makePathsAbsolute,
    doesContentPathExist,
    checkUrlProtocol,
    sanitizeDatabaseProperties
};

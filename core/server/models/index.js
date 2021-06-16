/**
 * Dependencies
 */

// enable event listeners
require('./base/listeners');

/**
 * Expose all models
 */
module.exports = {
    Base: require('./base'),
    ...require('./permission'),
    ...require('./post'),
    ...require('./role'),
    ...require('./settings'),
    ...require('./session'),
    ...require('./tag'),
    ...require('./tag-public'),
    ...require('./user'),
    ...require('./author'),
    ...require('./invite'),
    ...require('./webhook'),
    ...require('./integration'),
    ...require('./api-key'),
    ...require('./mobiledoc-revision'),
    ...require('./member'),
    ...require('./product'),
    ...require('./stripe-product'),
    ...require('./stripe-price'),
    ...require('./member-subscribe-event'),
    ...require('./member-paid-subscription-event'),
    ...require('./member-login-event'),
    ...require('./member-email-change-event'),
    ...require('./member-payment-event'),
    ...require('./member-status-event'),
    ...require('./posts-meta'),
    ...require('./member-stripe-customer'),
    ...require('./stripe-customer-subscription'),
    ...require('./email'),
    ...require('./email-batch'),
    ...require('./email-recipient'),
    ...require('./label'),
    ...require('./single-use-token'),
    ...require('./snippet'),
    // Action model MUST be loaded last as it loops through all of the registered models
    // Please do not append items to this array.
    ...require('./action')
};

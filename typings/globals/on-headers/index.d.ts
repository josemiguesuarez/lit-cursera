// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/56295f5058cac7ae458540423c50ac2dcf9fc711/on-headers/on-headers.d.ts
declare module "on-headers" {
    import http = require("http");

    /**
     * This will add the listener to fire when headers are emitted for res.
     * The listener is passed the response object as its context (this).
     * Headers are considered emitted only once, right before they 
     * are sent to the client.
     *
     * When this is called multiple times on the same res, the listeners
     * are fired in the reverse order they were added.
     *
     * @param res HTTP server response object
     * @param listener Function to call prior to headers being emitted,
     *        the response object is passed as this context.
     */
    function onHeaders(res: http.ServerResponse, listener: Function):void;

    // Note that this definition might be able to be improved in a future
    // version of typescript. At the moment it is not possible to declare
    // the type of the 'this' context for a function, but it might be included
    // in a future typescript version.
    // https://github.com/Microsoft/TypeScript/issues/229

    export = onHeaders;
}

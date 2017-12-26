# TerriblyTinyTales- Software Developer Application Challenge

# TECHNOLOGY STACK USED
Backend - NodeJs | Framework - ExpressJs
UI/Frontend - Angular4, HTML, CSS, Bootstrap
Server - DigitalOcean Cloud

# LIBRARIES/MIDDLEWARES USED
Lodash, Axios & Cors at the backend

# COMPONENTS OF CODE
The solution consists of a frontend built on Angular4 that queries the requested operation from the backend via simple http POST request. The body of the request contains the number of words to be fetched from the server. The backend which caters to this service request is built on NodeJs over ExpressJs.

The request is received by the express router and the associated method is invoked. The request-inputs are validated and the source text data is pulled from the specified ttt link via the axios. The backend code uses ES7's features like async/await for code simplification & readability.

The source data is parsed using standard javascript methods alongwith lodash's functions to generate an array of object each containing the word and its frequency in key-value pairs sorted by the frequency in descending followed by the word in ascending. The requested number of words are extracted from the top of this array and rendered as a JSON response to the service.

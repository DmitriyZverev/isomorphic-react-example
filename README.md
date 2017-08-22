# **Isomorphic React example**

Web application example, built on 
[Node.js](https://nodejs.org/), 
[Koa](http://koajs.com/), 
[React](https://facebook.github.io/react/), 
[Redux](http://redux.js.org/), 
and uses for development 
[Webpack](https://webpack.js.org/), 
[Babel](https://babeljs.io/), 
[ESLint](https://eslint.org/) and 
[Jest](https://facebook.github.io/jest/). 
This is single page application with server side rendering, which render data 
got from REST API server.

## **Technology stack**

 * Platform [Node.js v7.6+](https://nodejs.org/)
 * Package manager [Yarn v0.27+](https://yarnpkg.com/lang/en/)
 * HTTP server [Koa v2.3+](http://koajs.com/)
 * View layer [React v15.6+](https://facebook.github.io/react/)
 * Routing [React Router v4.1+](https://reacttraining.com/react-router/)
 * Data layer [Redux v3.7+](http://redux.js.org/)
 * HTTP Client [Isomorphic Fetch v2.2+](https://github.com/matthew-andrews/isomorphic-fetch)
 * Assets bundler [Webpack v3.3+](https://webpack.js.org/),
 * ES6 Compiler [Babel](https://babeljs.io/),
 * JavaScrip linter [ESLint v4.1+](https://eslint.org/)
 * Testing [Jest](https://facebook.github.io/jest/)

## **Application features**

This is a simple muscle cars encyclopedia, which contains a small muscle cars 
list, and information about each of it with image and specification.

## **Getting started**

1. Get the project:

```bash
git clone https://github.com/DmitriyZverev/isomorphic-react-example.git && \
cd isomorphic-react-example
```
2. Install dependencies:

```bash
yarn install
```

3. Launch REST API server:
```bash
yarn run api
```

4. Launch application server:
```bash
yarn start -- --static --build
```
Or for development:

```bash
yarn run watch
```
Now application is available at `http://localhost:8000`.
REST API service is available at `http://localhost:7000`.

## **Project layout**

```
/isomorphic-react-example/
 ├── /api/                 # API-server files
 │    ├── /app.js          # simple REST API application
 │    └── /data.json       # application data
 ├── /bin/                 # project commands
 │    ├── /api             # launch API-server command
 │    ├── /build           # build assets command
 │    ├── /start           # launch server command
 │    └── /watch           # launch development server command
 ├── /build/               # webpack output directory
 ├── /client/              # client side files
 │    ├── /components/     # React components uses on client side only
 │    └── /cilent.js       # client entry point
 ├── /common/              # files common for server side and client side
 │    ├── /components/     # React stateless components
 │    ├── /containers/     # React components connected with data layer
 │    ├── /actions.js      # actions module (see Redux docs)
 │    ├── /config.styl     # stylus configuration injected in each .styl file
 │    ├── /reducer.js      # root reducer (see Redux docs)
 │    ├── /routes.js       # routes configuration
 │    └── /types.js        # action types module (see Redux docs)
 ├── /public/              # root public directory
 ├── /server/              # server side files
 │    ├── /components/     # React components uses on server side only
 │    ├── /middlewares/    # Koa middlewares
 │    └── /server.js       # server entry point
 ├── /test/                # tests directory
 ├── /tools/               # build and launch tools
 │    ├── /webpack/        # webpack configurations
 │    │    ├── /client.js  # client webpck configuration
 │    │    ├── /index.js   # configration files collector 
 │    │    └── /server.js  # server webpack configuration
 │    ├── /build.js        # builds assets to build directory
 │    ├── /constants.js    # constants used by tools
 │    ├── /start.js        # launches the server
 │    ├── /utils.js        # utilites and helpers used by tools
 │    └── /watch.js        # launches the development server with live reload
 ├── /.gitignore           # Git ignore files
 ├── /config.js            # main project configuration file
 ├── /package.json         # list of dependencies and of packages configurations
 └── /yarn.lock            # dependencies lock file
```

## **Commands**

* `yarn start` - Launches project on port `8000`.
   
   Optional arguments:
   
   * `--static` - Serve static files
   * `--build` - Build the project before launch.
* `yarn run api` - Launches REST API server on port `7000`
* `yarn run build` - Builds all bundles to `./build/` directory
* `yarn run watch` - Launches development server with live reload on port `8000`
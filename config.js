/**
 * Main configuration module.
 */
import path from 'path';


/**
 * Environment params.
 */
export const NODE_ENV = process.env.NODE_ENV || 'development';
export const DEV = NODE_ENV === 'development';
export const PROD = NODE_ENV === 'production';


/**
 * Directory paths.
 */

// Path to the project root.
export const ROOT_DIR = __dirname;

// Path to the directory where will built server bundle.
export const BUILD_SERVER_DIR = path.join(ROOT_DIR, 'build');

// Path to the directory where will collect static files.
export const BUILD_PUBLIC_DIR = path.join(BUILD_SERVER_DIR, 'public');

// Path to the public root directory (e.g. access to robots.txt, favicon.ico).
export const PUBLIC_DIR = path.join(ROOT_DIR, 'public');


/**
 * File paths.
 */

// Path to the server bundle.
export const SERVER_PATH = path.join(BUILD_SERVER_DIR, 'server.js');

// Path to the assets files.
export const ASSETS_PATH = path.join(BUILD_SERVER_DIR, 'assets.json');

// Path to the stylus configuration file.
export const STYLUS_CONFIG_PATH = path.join(ROOT_DIR, 'common', 'config.styl');


/**
 * Other settings.
 */

// URL to use when referring to static files.
export const PUBLIC_URL = '/public/';

// Css files naming.
export const CSS_NAME_PATTERN = DEV
  ? '[name]__[local]__[hash:base64:4]'
  : '[hash:base64:8]';
// Other files naming.
export const FILE_NAME_PATTERN = DEV
  ? '[name]__[hash:base64:4].[ext]'
  : '[hash:base64:8].[ext]';

// Port that should listen a server.
export const PORT = 8000;

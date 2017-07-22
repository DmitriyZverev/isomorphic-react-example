import path from 'path';

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const DEV = NODE_ENV === 'development';
export const PROD = NODE_ENV === 'production';

export const ROOT_DIR = __dirname;
export const BUILD_SERVER_DIR = path.join(ROOT_DIR, 'build');
export const BUILD_PUBLIC_DIR = path.join(BUILD_SERVER_DIR, 'public');
export const PUBLIC_DIR = path.join(ROOT_DIR, 'public');

export const SERVER_PATH = path.join(BUILD_SERVER_DIR, 'server.js');
export const ASSETS_PATH = path.join(BUILD_SERVER_DIR, 'assets.json');
export const STYLUS_CONFIG_PATH = path.join(ROOT_DIR, 'common', 'config.styl');

export const PUBLIC_URL = '/public/';

export const CSS_NAME_PATTERN = DEV
  ? '[name]__[local]__[hash:base64:4]'
  : '[hash:base64:8]';
export const FILE_NAME_PATTERN = DEV
  ? '[name]__[hash:base64:4].[ext]'
  : '[hash:base64:8].[ext]';

export const PORT = 8000;

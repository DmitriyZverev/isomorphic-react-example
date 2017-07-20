import path from 'path';

export const NODE_ENV = process.env.NODE_ENV;
export const DEV = NODE_ENV === 'development';
export const PROD = NODE_ENV === 'production';

export const ROOT_DIR = __dirname;
export const BUILD_DIR = path.join(ROOT_DIR, 'build');
export const PUBLIC_DIR = path.join(BUILD_DIR, 'public');

export const SERVER_PATH = path.join(BUILD_DIR, 'server.js');
export const ASSETS_PATH = path.join(BUILD_DIR, 'assets.json');

export const PUBLIC_URL = '/public/';

export const PORT = 8000;

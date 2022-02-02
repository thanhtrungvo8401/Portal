# LOCALHOST: 3000
> npm install
> npm run dev
.env.development will be loaded (if we dont have .env.local)
PORT = 3000

# DEVELOPMENT: 1002
> cd DEV
> npm install
> npm run build
> (npm run start:dev)
.env.production will be loaded (if we dont have .env.local)
PORT = 1002
> (pm2 start "npm run start:dev" --name DEV_PORTAL_1002): Create
> pm2 restart DEV_PORTAL_1002

# PRODUCTION: 3009
> cd PRO
> npm install
> npm run build
> (npm run start:pro)
>>> sudo nano .env.local with PORT = 3009
> (pm2 start "npm run start:pro" --name PRO_PORTAL_3009): Create
> pm2 restart PRO_PORTAL_3009


<!-- .env.local will overide all of these file -->
=> .env.local should be added into .gitignore
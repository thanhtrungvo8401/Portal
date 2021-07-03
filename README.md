# LOCALHOST
> npm install
> npm run dev
.env.development will be loaded (if we dont have .env.local)
PORT = 3000

# DEVELOPMENT
> cd DEV
> npm install
> npm run build
> (npm run start:dev)
.env.production will be loaded (if we dont have .env.local)
PORT = 3001
> pm2 start "npm run start:dev" --name DEV_PORTAL_3001

# PRODUCTION
> cd PRO
> npm install
> npm run build
> (npm run start:pro)
>>>>> create .env.local with PORT = 3009
> pm2 start "npm run start:pro" --name PRO_PORTAL_3009
4


<!-- .env.local will overide all of these file -->
=> .env.local should be added into .gitignore
# LOCALHOST
> npm run dev
.env.development will be loaded (if we dont have .env.local)

# DEVELOPMENT
> npm run build
> npm run start:dev or start:pro
.env.production will be loaded (if we dont have .env.local)

# PRODUCTION
> npm run build
> npm run start:pro
.env.production will be loaded (if we dont have .env.local)


# .env.local will overide all of these file 
# => .env.local should be added into .gitignore
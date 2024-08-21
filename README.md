
# Craft 5 UI setup instructions

## Features
- Light/dark mode toggle
- PM2 auto-restart if the server crashes

## Steps 
1. Begin these once the CraftCMS project is running successfully
1. Use this template to create a new repository
1. Remove .example from .env
1. Paste in the db URL and CMS token (remove "Authorization: Bearer")
1. NPM install
1. Use TODOTree or Search for TODO and finish all
1. npm run dev

## Hosting
- Purchase a Digital Ocean droplet
- Connect the droplet to RunCloud.io
- Create 2 system users and generate a password. Store passwords for SSH connection
- Create a DB user, then a DB in runcloud.
- Create 2 webapps, one for the ui and one for the db
  - Prefer www version  
  - Put the deploy keys in each runcloud project
  - Add `:/home/app_user_name` to the end of open_basedir
- Using the Digital Ocean console or SSH (vscode or other) into the DB server
  - run `gunzip db.sql.gz`
  - run `mysql -u <db_user_name> -p <db_name> < db.sql`
- Add to DNS records
  - if domain 
    - `A_record @ server_ip 600s`
    - `CName www url_name.com. 1hour`
  - if subdomain 
    - `A_record url_name server_ip 1hour`
    - `CName *.url_name url_name.com. 1hour`
- Add SSL record
- Add .htaccess file DB project
- Add NGINX config to server ui runcloud webapp settings
  - Add a proxy config and uncomment the proxy_redirect and the last 3 lines
  - Create a custom root definition
     - `add_header Content-Security-Policy "frame-ancestors 'self' <https://yourbackendwebsite.com>"`; 
- Create the graphql schema and token
- In CraftCMS, check Utilities > System Report > scroll to Requirements and make sure these are all removed from the list in RunCloud.io Webapp settings.
- Fill in the .env file in the ui project
- Run this in the UI project `pm2 start npm --name "<give_reasonable_name>" -- start`
- Run this in the UI project `pm2 save`
- Run this in the UI project `pm2 startup`

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`CRAFT_CMS_GRAPHQL_ENDPOINT`
`CRAFT_CMS_GRAPHQL_TOKEN`
`MY_SECRET_TOKEN`

## Deployment

RunCloud sets up webhooks into our github repos, so the deployment of changes should be done through that webhook. When you `git push` to main or merge a PR to main, the production site will auto-magically update.

## Contributing

Utilize Atomic Design principles. 


## Authors

[@dancrump1](https://www.github.com/dancrump1)

## Tech Stack

*Client:* React v18+, TailwindCSS, Framer Motion

*UI Server:* Node v18+, NextJS, NginX

*DB Server:* CraftCMS v5, NginX, Apache

## Support

For support, email support@drivebrandstudio.com 


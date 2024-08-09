
# Craft 5 UI and Back End setup instructions
React + NextJS Front End, Back End CraftCMS project.

## Authors

- [@dancrump1](https://www.github.com/dancrump1)

## Tech Stack

*Client:* React v18, TailwindCSS, Framer Motion

*UI Server:* Node, NextJS, NginX

*DB Server:* CraftCMS, NginX, Apache

## Features

- Light/dark mode toggle
- Live previews (🏗🚧)
- Custom CraftCMS on save method to cause the UI app to refresh the data when an entry is saved


## Steps (start with the backend)
### Backend (20 steps if you take it slow)
1. ```bash
   mkdir [FOLDER_NAME]
   ```
1. ```bash
    cd [FOLDER_NAME]
    ```
1. ```bash
    git clone git@github.com:drivebrandstudio/craft5-starter.git ./
    ```
1. ```bash
    rm -r -f .git
    ```

1. ```bash
    git init .
      ```

1.  ```bash
    git add .
      ```

1.  ```bash
    git remote add origin <URL_OF_EMPTY_GITHUB_REPO>
    ```    

1.  ```bash
    git commit -m 'First Commit'
    ```

1.  ```bash
    git push origin main
    ```
> [!TIP]
> You can skip to the UI section if you don't care about local stanup.
10. Remove .example from the .env file

1.  ```bash
    composer install
    ```

1.  ```bash
    ddev start
    ```

1. ```bash
    ddev exec php craft setup/security-key
    ```

1.  ```bash
    ddev exec php craft setup/app-id
    ```

1.  ```bash
    ddev import-db --file=db.sql.gz
    ```

1. Add "headlessMode" => true to config > general.php
1. Add "api" => "graphql/api" to config > routes.php
1. Navigate to https://craft-starter.ddev.site/access
  - u: cc_admin
  - p: letmein
19. Graphql > schemas > create new > label Private
1. Graphql > tokens > create new > apply to Private schema and copy the token to notepad (will need later)

### UI
```bash
mkdir [FOLDER_NAME]
```

```bash
cd [FOLDER_NAME]
```

```bash
git clone git@github.com:drivebrandstudio/Craft5-UI.git ./
```

```bash
rm -r -f .git
```

```bash
git init .
```

```bash
git add .
```

```bash
git remote add origin <URL_OF_EMPTY_GITHUB_REPO>
```    

```bash
git commit -m 'First Commit'
```

```bash
git push origin main
```
> [!TIP]
> You can skip to the Hosting section if you don't care about local stanup.
- Remove .example from .env
- Paste in the db URL and CMS token (remove "Authorization: Bearer")
- NPM install
- Use TODOTree or Search for TODO and finish all
- npm run dev

## Hosting the 2 projects
- Purchase a Digital Ocean droplet
- Connect the droplet to RunCloud
- Create 2 system users and generate a password. Store in hosting&domains
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
    - A record @ server_ip 600s
    - CName www url_name.com. 1hour
  - if subdomain 
    - A record url_name server_ip 1hour
    - CName *.url_name url_name.com. 1hour
- Add SSL record
- Add .htaccess file do server DB project
- Add NGINX config to server ui runcloud webapp settings
  - Add a proxy config and uncomment the proxy_redirect and the last 3 lines
  - Create a custom root definition
     - add_header Content-Security-Policy "frame-ancestors 'self' <https://yourbackendwebsite.com>"; 
- Create the graphql schema and token
- Fill in the .env file in the server ui project
- Run `pm2 start npm --name "<give_reasonable_name>" -- start`

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`CRAFT_CMS_GRAPHQL_ENDPOINT`

`CRAFT_CMS_GRAPHQL_TOKEN`
## Run Locally

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```
## Deployment

RunCloud sets up webhooks into our github repos, so the deployment of changes should be done through that webhook. When you `git push` to main or merge a PR to main, the production site will auto-magically update.

## Usage/Examples


### Next Router
```javascript
import Component from 'my-project'

function App() {
  return <Component />
}
```

### Server vs Client components
```javascript
### Example Client component ###

'use client'

import Component from 'my-project'

function Page() {
  return <Component />
}
```

```javascript
### Example Server component ###

import Component from 'my-project'

function App() {
  return <Component />
}
```


## Contributing

Utilize Atomic Design principles. 

## Lessons Learned
- If using EmbedAssets plugin, delete `proc_open` from the disabled functions list in runcloud



## Support

For support, email support@drivebrandstudio.com 


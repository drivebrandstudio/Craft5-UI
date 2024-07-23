
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


## Steps (start with the backend)
### Backend
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

- Remove .example from the .env file

```bash
composer install
```

```bash
ddev start
```

```bash
ddev exec php craft setup/security-key
```

```bash
ddev exec php craft setup/app-id
```

```bash
ddev import-db --file=db.sql.gz
```

- Add "headlessMode" => true to config > general.php
- Add "api" => "graphql/api" to config > routes.php
- Navigate to https://craft-starter.ddev.site/access
    - u: cc_admin
    - p: letmein
- Graphql > schemas > create new > label Private
- Graphql > tokens > create new > apply to Private schema and copy the token to notepad (will need later)

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

- Remove .example from .env
- Paste in the db URL and CMS token (remove "Authorization: Bearer")
- NPM install
- Use TODOTree or Search for TODO and finish all
- npm run dev


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



## Support

For support, email support@drivebrandstudio.com 


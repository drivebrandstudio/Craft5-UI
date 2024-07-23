
![Logo](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/th5xamgrr6se0x5ro4g6.png)


# Craft 5 UI example project
React + NextJS frontend/backend for a CraftCMS project.

## Resources

 - [Reference Project](https://github.com/magicspon/nextjs-craftcms-mono)


## Authors

- [@dancrump1](https://www.github.com/dancrump1)


## Tech Stack

*Client:* React v18, TailwindCSS, Framer Motion

*Server:* Node, NextJS

*NextJS:* The file structure in src > pages is how the Next Server knows which file to route to.


## Features

- Light/dark mode toggle
- Live previews (🏗🚧)


## Utilize the template

Create your own repository utilizing this template

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

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NEXT_PUBLIC_CRAFT_CMS_GRAPHQL_ENDPOINT`

`NEXT_PUBLIC_CRAFT_CMS_GRAPHQL_TOKEN`
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

SEO is a server sided endevour. 

UI libraries are shweet!

Figure out data = easy UI build-out!

## Support

For support, email support@drivebrandstudio.com 


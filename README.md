# NextJS headless UI for CraftCMS v5

## Run Locally

- Remove .example from .env
- Paste in the db URL and CMS token (remove "Authorization: Bearer")
- NPM install
- Use TODOTree or Search for TODO and finish all
- npm run dev


## Cloud Hosting

- Purchase a Digital Ocean droplet
- Connect the droplet to RunCloud.io
- Create a system user and generate a password. `----Store passwords for SSH connection to server later----`
- Create a webapp for the NextJS project
  - Utilize a GH repo
  - Prefer www version  
  - Generate and put the deploy key in the cooresponding Github Repo
  - Add `:/home/app_user_name` to the end of open_basedir
- Add to DNS records
  - if domain 
    - `A_record @ server_ip 600s`
    - `CName www url_name.com. 1hour`
  - if subdomain 
    - `A_record url_name server_ip 1hour`
    - `CName *.url_name url_name.com. 1hour`
- Add SSL record
- Add NGINX config
  - Add a proxy config and uncomment the proxy_redirect and the last 3 lines
  - Create a custom root definition
     - `add_header Content-Security-Policy "frame-ancestors 'self' <https://yourbackendwebsite.com>"`; 
- Fill in the .env file with CMS gql URL and token 
- On the server, run `pm2 start npm --name "<give_reasonable_name>" -- start`, then `pm2 save`, then `pm2 startup` (If the DO server ever restarts, this forces `npm run start` on boot, bringing your site back to life:D )

RunCloud sets up webhooks into our github repos, so the deployment of changes should be done through that webhook. When you `git push` to main or merge a PR to main, the production site will auto-magically update.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`NEXT_PUBLIC_CRAFT_CMS_GRAPHQL_ENDPOINT`

`NEXT_PUBLIC_CRAFT_CMS_GRAPHQL_TOKEN`

`MY_SECRET_TOKEN`

`NODE_TLS_REJECT_UNAUTHORIZED`

`SITEMAP_URL`

`ENVIRONMENT`  # dev / staging / production

## Features

- Light/dark mode toggle
- ShadCN / Aceternity / MagicUI / More starter components
- Preview endpoint
- Revalidate endpoint
- sitemap xml generator

## Authors

[@dancrump1](https://www.github.com/dancrump1)
## Acknowledgments
- [ShadCN](https://ui.shadcn.com/)
- [Aceternity](https://ui.aceternity.com/)
- [Magic UI](https://magicui.design/)
- [Wind UI](https://wind-ui.com/components/)
- [Wicked Blocks](https://wickedblocks.dev/)
- [Hover.dev](https://www.hover.dev/components)
- [Hyper UI](https://www.hyperui.dev/)
- [Ever UI](https://www.ever-ui.com/)
- If you see your library please put an issue in to be added here, was moving too fast to remember them all :)
## Tech Stack

*Client:* React v18+, TailwindCSS, Framer Motion

*UI Server:* Node v18+, NextJS, NginX

*DB Server:* CraftCMS v5, NginX, Apache

## Support

For support, email support@drivebrandstudio.com 
## Roadmap
- Add SEO (Using SEO pluging from CraftCMS)
- Figure out how to demonstrate an application example w/o having api opinionation (meaning, I want to have a few layouts for people to use as examples to follow for code syntax, but I don't want my CMS field/variable names getting in the way)
- Clean up tailwind base styles
- Clean up Next config
- Rename `/src/server` directory to `/helpers` or something
## UI_examples (🚧WIP🚧)
> [!CAUTION]
> FLASH WARNING when I demonstrate the dark/light mode in each video

https://github.com/user-attachments/assets/f2805740-c5f0-435b-9631-d7ad30f0a8cf

https://github.com/user-attachments/assets/859457e9-3a93-4929-a7ff-e2a5510fbd72

https://github.com/user-attachments/assets/5214eb78-a1ff-451f-89ca-d7069f1b7c9c

https://github.com/user-attachments/assets/30656964-2cac-489b-8ebc-cc7ead9004f3



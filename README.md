
##### Last reviewed 8/21/2024

# Drive Brand Studio CraftCMS v5 template
## Requirements
1. Computer with MINIMUM 8gb RAM, modern OS (so Windows, Linux or Mac) 
1. NodeJS v18+
2. Ubuntu v22.04
3. PHP 8.1+
4. DDEV
5. Docker


## Local Hosting (Dev) 
1. Add empty .env file to the root of the project (next to .env.example)
1. Add CRAFT_ENVIRONMENT=dev to the .env
2. Change web > .htaccess_dev into .htaccess (or prod if you are putting this on your production server)
1. Configure the project
     ```shell
     ddev config
     ```
1. Start the DB server
     ```shell
     ddev start
     ```
5. Install necessary packages
   ```shell
   ddev composer install
   ```
5. Install craft
   ```shell
   ddev --import-db --file=starter.sql.gz
   ```
5. Configure craft
   ```shell
   ddev craft setup
   ```
1. Launch craft
   ```shell
   ddev launch
   ```
8. In the GraphQL tab:
    - Select Schemas and in the Private Schema, make sure all checkboxes are checked.
    - Then, select the Tokens tab and create a new token. Name it something like 'Private' and copy only the token value after `Bearer`.
11. Create a FileSystem for asset uploads and Assets, but make sure to name the path ANYTHING OTHER THAN ASSETS

 `(For example, if you have an assets/ folder, that would conflict with the /assets page in the control panel.)`
          ![image](https://github.com/user-attachments/assets/6f1f6579-442e-4213-8a35-cb1dc88b1707)
          ![image](https://github.com/user-attachments/assets/509fcf48-d478-4733-90ce-eddabd093cd1)


## Cloud Hosting (Staging / Production)

1. Purchase a Digital Ocean droplet
1. Connect the droplet to RunCloud.io
1. Create a system user and generate a password. `-----Store passwords for SSH connection to server later-------`
1. Create a DB user, then a DB in runcloud.
1. Create a webapp or your CMS
  - From a GH repo
  - Prefer www version  
  - Generate and put the deploy key in your GH repo
  - Add `:/home/app_user_name` to the end of open_basedir
6. Using the Digital Ocean console or SSH (vscode or other) into the DB server
  - run `gunzip db.sql.gz`
  - run `mysql -u <db_user_name> -p <db_name> < db.sql`
7. Add to DNS records
  - if domain 
    - `A_record @ server_ip 600s`
    - `CName www url_name.com. 1hour`
  - if subdomain 
    - `A_record url_name server_ip 1hour`
    - `CName *.url_name url_name.com. 1hour`
8. Add SSL record
1. Add .htaccess file to the web directory
1. Create the graphql schema and token
1. In CraftCMS, check Utilities > System Report > scroll to Requirements and make sure these are all removed from the list in RunCloud.io Webapp settings.


RunCloud sets up webhooks into our github repos, so the deployment of changes should be done through that webhook. When you `git push` to main or merge a PR to main, the production site will auto-magically update.
### Acknowledgments
- [CreateSean](https://github.com/CreateSean/craft-starter)
### Features
- Live preview
- Revalidate Front End data on save of Entries / Categories / Globals
- SEO optimization
### Contributor & Developer Resources & Guides
   - Docker 🐳 — [Docker Installation](https://ddev.readthedocs.io/en/latest/users/install/docker-installation/)
   - DDEV 🤓 — [DDEV Installation](https://ddev.readthedocs.io/en/latest/users/install/ddev-installation/#wsl2-docker-desktop-install-script)
   - Composer 🎼 — [Composer](https://getcomposer.org/doc/)
   - CraftCMS 📝 — [CraftCMS](https://craftcms.com/docs/)
   - .env 🦺 — [.env](https://www.dotenv.org/docs)
   - Node V18+, I recommend using NVM to install and manage — [NVM](https://github.com/nvm-sh/nvm)

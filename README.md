# JawsomeMart

This application is a React SPA (Single Page Application) e-commerce solution that uses [Vite](https://vite.dev) and the MERN stack.

## IMPORTANT

When in development mode (see Env Variable section) the application is configured to use port 3000 (frontend) and port 3030 (backend).
On a Mac computer you may need to turn off AirPlay, as in the recent Mac OS releases AirPlay listens on ports 3030 & 7000.
In order to free port 3030 for use, to turn off AirPlay when using a Mac.

- Open System Settings.
- Search for 'AirPlay Receiver' and select that option in the search results.
- Toggle 'AirPlay Receiver' to the off position. This will free port 3030 on your system.

## Usage

- Create a MongoDB database and obtain your `MongoDB URI` - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)

### Env Variables

Use the `.env` to configure environment variables. Change the JWT_SECRET to what you want. Eg:

```
NODE_ENV = development
PORT = 3030
MONGO_URI = your mongodb uri
JWT_SECRET = 'abc123'
```

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
cd ..
```

### Running the frontend & backend

```
# these commands are run in the root directory of the project

# Run frontend (:3000) & backend (:3030)
npm run dev

# Run backend only
npm run server
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```

## Developer Workflow

The main branch is only for production. Developers will work only in the dev branch. 
The following workflow goes through the process of creating a feature branch through 
submitting the pull request.

```
# Start in the dev branch
git checkout dev

# Sync latest dev branch changes from GitHub dev (from other developers) into your local
# dev repo
git pull origin dev

# Create your feature branch, this will also switch you into your new feature branch
git checkout -b [your-name/feature-name]

# Work on your new feature files and when you are ready at least stage all of the changes
# you've made before proceeding.
#
# At this point in the workflow, you are ready to push your new feature branch to GitHub.
# Before pushing your feature to GitHub you will need to sync with the GitHub dev branch
# to bring your local dev repo up to date with latest changes.
#
# So now go back to your local dev branch.
git checkout dev

# Sync the latest changes from GitHub dev to bring your local dev up to date.
git pull origin dev

# Now go back to your feature branch
git checkout [your-name/feature-name]

# Now merge any changes that have happened in the dev branch into your feature branch
# This is where merge conflicts may occur
# You will have to resolve any/all merge conflicts, but hopefully there are none 
git merge dev

# After merging and resolving any conflicts you can push your feature branch to GitHub
git push origin dev

# At this point your feature branch should be in GitHub and you will need to create a pull request
# specifically for your feature branch so that the branch can be merged into the GitGub dev branch.
#
# The pull request is necessary so that GitHub dev gets your feature changes and other developers
# can pickup your changes.
#
# repeat as needed, happy coding!!
```

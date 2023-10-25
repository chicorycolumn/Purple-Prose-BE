# Purple Prose backend

## Description

Purple Prose is an online news aggregation forum where users can write and share articles as well as commenting and voting on each other's articles and comments. Have you used Reddit? It's Reddit.

This project is a fullstack RESTful API, with a PSQL database where Knex was used as a query builder, and a Frontend of React and CSS Modules. It was a solo project during the last week of the Backend and Frontend blocks of the [Northcoders](https://northcoders.com/) coding bootcamp.

## Instructions

This backend is live on [Heroku](https://purple-prose.herokuapp.com/api).
<br/>
The frontend counterpart repository can be found [here](https://github.com/chicorycolumn/Purple-Prose-FE).
<br/>
The live site is on [Netlify](https://purpleprose.netlify.app/).
<br/>
You can also download this repository and run the project locally by following these steps:

1. Fork this repository by clicking the button labelled 'Fork' on the [project page](https://github.com/chicorycolumn/Purple-Prose-BE).
   <br/>
   Copy the url of your forked copy of the repository, and run `git clone the_url_of_your_forked_copy` in a Terminal window on your computer, replacing the long underscored word with your url.
   <br/>
   If you are unsure, instructions on forking can be found [here](https://guides.github.com/activities/forking/) or [here](https://www.toolsqa.com/git/git-fork/), and cloning [here](https://www.wikihow.com/Clone-a-Repository-on-Github) or [here](https://www.howtogeek.com/451360/how-to-clone-a-github-repository/).

2. Open the project in a code editor, and run `npm install` to install necessary packages. You may also need to install [Node.js](https://nodejs.org/en/) by running `npm install node.js`.

3. Run `npm run newdev` and then `npm start` to run the project. The former is a combined command which will drop the SQL tables, create new ones, rollback and run any necessary migrations, seed the data, set the environment to development mode.

4. Use an API testing tool like Insomnia to test the endpoints of this project, by sending http requests to [http://localhost:9090](http://localhost:9090).

5. Run the battery of tests written specifically for this project with `npm run newtest`. This is a combined command which will drop the SQL tables, create new ones, rollback and run any necessary migrations, seed the data, set the environment to testing mode, and finally run the tests.

6. For subsequent testing, only `npm run test` is needed.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Hosting

General instructions for taking a **project with a PSQL database** and hosting it on **Heroku** for **manual deployment** are as follows:

0. Ensure the project is initialised in a Git repository. If you are unsure what this means, instructions can be found [here](https://medium.com/@JinnaBalu/initialize-local-git-repository-push-to-the-remote-repository-787f83ff999) and [here](https://www.theserverside.com/video/How-to-create-a-local-repository-with-the-git-init-command).

1. Install the Heroku CLI with `npm install heroku` and login to your account with `heroku login`. Other ways to install it are `sudo snap install --classic heroku` on Ubuntu or `brew tap heroku/brew && brew install heroku` on MacOS.

2. Making sure you are in the project folder, create the app with `heroku create my-awesome-app`, then check it has succeeded with `git remote -v`, which should show you a Heroku url with that project name, then push the code to it with `git push heroku master`.

3. In a browser, go to the Heroku site, log in, select your app, then _Configure Add-ons_ then choose _Heroku Postgres free tier_.

4. Check that your database url has been added to the environment variables on Heroku with `heroku config:get DATABASE_URL`. If you are in your app's directory, and the database is correctly linked as an add-on to Heroku, it should display a DB URI string that is exactly the same as the one in your credentials on Heroku.

5. Run `git add .` then `git commit -m "Pushing to Heroku"` then `git push heroku main`.

6. Run `npm run seed:prod` then `npm start`, then repeat step 5.

7. The project should now be live and hosted, and can be viewed by running `heroku open`, and issues can be debugged with `heroku logs --tail`.

## Built with

- [JavaScript](https://www.javascript.com/) - The primary coding language
- [VisualStudioCode](https://code.visualstudio.com/) - The code editor

- [Heroku](https://www.heroku.com/) - The cloud application platform used for the backend
- [Netlify](https://www.netlify.com/) - The hosting service used for the frontend

- [PSQL](http://postgresguide.com/utilities/psql.html) - The interactive terminal for use with postgres
- [Knex](http://knexjs.org/) - The SQL query builder
- [MySQL](https://www.mysql.com/) - The database management system
- [Axios](https://github.com/axios/axios) - The HTTP client
- [Express](http://expressjs.com/) - The web application framework

- [React](https://reactjs.org/) - The frontend framework
- [Reach Router](https://reach.tech/router/) - The router
- [CSS Modules](https://github.com/css-modules/css-modules) - The design organisation system

- [Mocha](https://mochajs.org/) - The testing framework
- [Chai](https://www.chaijs.com/) - The testing library

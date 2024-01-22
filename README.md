# Project Title
Node.js App From Scratch -Traversy Media- Follow along

[Live Site]() Demo Link

Building a fullstack CRUD webapp using Node.js/Express/MongoDB. Uses Google OAuth for authentication.

## Getting Started

To get a copy of this project, you can fork the repo then clone it as your own.

### Prerequisites
- A Github Account
- Your local Git CLI, Git Bash comes with the windows Git installation.

### Installing

[Fork the Repo](https://github.com/octocat/Spoon-Knife)

[Clone the Repo](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository)

[Navigate to the directory and run npm install to install all necessary dependencies](https://docs.npmjs.com/cli/v10/commands/npm-install)

### Optimizations
Any planned future optimizations

### Knowledge gained from this project
Learned how to use mongoose to be able to connect to MongoDB and apply schemas.
Found out there are definitely people connecting to my existing cluster as I forgot to make an old project private, which was using my dbConnection string directly in the server.js! Oops! Learned how to terminate a cluster.
Learned how to setup the handlebars engine and define specific configurations for the engine such as the defaultLayout which will be used for the majority of our routes from which we can then render specific hbs files as the body for the individual layouts.
Learned how to use the express router/ and how to encapsulate our routes as a seperate component and use them within the main app. 
Learned how to bring in the materialize framework, a framework that is built upon Google's Material Design philosophy and provides a multitude of both CSS and JS components.
Learned how author origins are applied, the order the browser parses the stylesheet is the order they are in the cascade.
Got experience using materialize to be able to create styled components very fast. I think I'm going to love tailwind in the future! It provides the power of these predefined classes, without limiting us to the opinions of these component libraries.
Learned how to set up a project on google cloud console, specifically how to enable the Google+ API(Deprecated, Google Sign In is now the preferred API) for authentication.
Learned how to define a schema using mongoose.
Learned about the next tick queue!
Learned a lot about OAuth and authentication/authorization in general.
Learned a bunch about how to protect routes with custom made middleware.
Got a lot of debugging experience following a tutorial from 3 years ago.
Learned how to bring in CKEDITOR to replace a textarea within a form, A WYSIWYG editor for rich text.
Learned how to collapse all folders in a directory in VSCODE!!! Always nice to find and explore features of the editor we are working in :D To do so within the VSCODE explorer, hover over the directory name and click the rightmost icon.
Learned how to create a custom helper for handlebars and pass it in to be able to use within our views.
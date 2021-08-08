# TODO List App (Client)

This repository represents the client side of the app.
It will allow the user to register an account, create projects and add tasks.
TODO List App is a task management app that helps to organize your daily basis tasks.

## Frameworks / Libraries / Tools during development

| Name    | Description                        |
| ------- | ---------------------------------- |
| Vite    | Front-end Build Tool               |
| ReactJS | Component based Javascript library |
| Chrome  | Browser debugging                  |
| VSCode  | Code Editor                        |

## Packages

| Name              | Description                                              |
| ----------------- | -------------------------------------------------------- |
| material-ui       | React components that implement Google's Material Design |
| axios             | Promise based HTTP client for the browser and node.js    |
| react             | JavaScript library for creating user interfaces.         |
| react-dom         | React package for working with the DOM.                  |
| react-router-dom  | DOM bindings for React Router.                           |
| react-toastify    | React notifications.                                     |
| styled-components | Visual primitives for the component.                     |

## Project Structure

The folder structure of this app is explained below:

| Name               | Description                                                                                             |
| ------------------ | ------------------------------------------------------------------------------------------------------- |
| **node_modules**   | Contains all npm dependencies build.                                                                    |
| **src/auth**       | Contains all the helpers and components to secure web pages that are only available to the logged user. |
| **src/components** | Contains all the components.                                                                            |
| **src/pages**      | Contains all the general components.                                                                    |
| **src/utils**      | Contains all style utils files.                                                                         |
| **vite.config.js** | File where was implemented the Proxy.                                                                   |

## Proxy

A proxy was configured so it could be easier to make requests using the app url instead of the server. It is also a secure way to protect our server url.
The config is as follows:

```
server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
```

## Setup

- Clone the repository
- Install dependencies

```
npm install
```
- Run the server

```
npm run dev
```

## What could be done so it would be production-ready?
Having the opportunity to develop more this project, there are a few things that it could be improved on:
- More abstract components in order to be reused often.
- Handling the responsiveness better so it could be used in different devices.
- Improve UX and UI.
- Change classes into Hooks so it could be standardized and well maintained.
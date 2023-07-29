# React Paint

A drawing app for several participants. Developed in react with canvas and websocket. Program with the ability to simultaneously connect up to 5 participants on 1 canvas.

## Main features of this App

> Drawing simple shapes like line, rectangle and circle

> Erasing the superfluous and unnecessary

> Choose the color and size of shape lines

> Filling shapes of any shapes with the selected color

> Draw up to 5 participants on 1 canvas

> Notify the canvas user when members join and leave

## [Project Live Link](https://react-paint.onrender.com/)

## Technologies

- [ReactJS](https://reactjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [Node](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [Express-WS](https://github.com/HenningM/express-ws)

## Getting Started

To get a local copy up and running follow these simple example steps.

  ```
  $ git clone git@github.com:OlAndrey/React-Paint.git
  $ cd React-Paint
  ```
  
#### Server
- cd into backend and write npm install or npm i in command terminal

  ```
  $ cd server
  $/server npm install
  ```

- Write npm run dev to start the backend server

  ```
  $/server npm run dev
  ```

#### Client
- cd into my-project and write npm install or npm i in command terminal

  ```
  $ cd client
  $/client npm install
  ```

- Write npm start to start the react server

  ```
  $/client npm start
  ```

Create a `.env` file in the client directory and add the next contents to it:
   
  ```
    REACT_APP_API_URL : localhost:5000 or any other url to connect rest api
    REACT_APP_WS_URL : ws://localhost:5000 or any other url to connect web socket`
  ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Support

Reach out to me at one of the following places!

- Email at <a href="mailto:oleynik.andrey01@gmail.com">`oleynik.andrey01@gmail.com`</a>

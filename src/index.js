// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';
//
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
//
// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

  const express = require("express");
  const cors = require("cors");
  const TeachableMachine = require("@sashido/teachablemachine-node");
  const bodyParser = require("body-parser");

  // modelUrl: "https://teachablemachine.withgoogle.com/models/gpvttSymp/",

  const model = new TeachableMachine({
    modelUrl: "https://teachablemachine.withgoogle.com/models/P-JKgi26r//",
  });

  https: var corsOptions = {
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  };

  const app = express();
  app.use(express.json());
  app.use(bodyParser.json());
  const port = process.env.port || 5000;

  app.use(express.urlencoded({ extended: false }));

  app.use(cors());

  app.get("/", (req, res) => {
    res.send(`
    <form action="/image/classify" method="POST">
    <p>
    Enter Image Url</p>
    <input name='ImageUrl' autocomplete=off>
    <button>Predict Image</button>
    </form>
      `);
  });

  app.post("/image/classify", async (req, res) => {
    // console.log(req);
    const url = req.body.ImageUrl;

    return model
      .classify({
        imageUrl: url,
      })
      .then((predictions) => {
        // console.log("Hello");
        // console.log(predictions);
        res.json(predictions);
      })
      .catch((e) => {
        // console.error(e);
        res.status(500).send("Something went wrong!");
      });
  });

  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });

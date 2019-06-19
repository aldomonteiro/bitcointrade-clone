This project is a clone of the BitcoinTrade Market Screen. 

## [Demo](https://bitcointrade.aldomonteiro.com).

## Features

- Bootstrapped with create-react-app
- State with Redux Saga
- Material Design using Material-UI
- Real data from the BitcoinTrade API.

## How to run it locally?

Clone the repository:

`git clone https://github.com/aldomonteiro/bitcointrade-clone`

Get an api key from [BitcoinTrade](https://broker.bitcointrade.com.br/api/token)

Create a `.env` file with the created key:

`REACT_APP_API_KEY=<your api key>`

Install all the dependencies

`npm install`

Start the development server:

`npm run start`

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

`npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!
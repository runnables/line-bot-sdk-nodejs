# LINE Bot API Simsimi Example

A LINE Bot API example showing how to redirect your communication with LINE bot to Simsimi API and then back.

## Prerequisite
- Have a [LINE BOT Trial](https://developers.line.me/bot-api/overview) account running 
- Have an access to [Simsimi API](http://developer.simsimi.com/api) (Trial version is fine)

## Running Locally

Set your credentials for LINE Bot API and Simsimi API in index.js
Make sure you have [Node.js](http://nodejs.org/) installed.

```sh
$ npm install
$ npm start
```

Your app should now be running on [localhost:5000](http://localhost:5000/).

## Deploying to Heroku

```
$ git init
$ heroku create
$ git push heroku master
```

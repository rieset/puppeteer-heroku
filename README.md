# Puppeteer Heroku

[![Linter](https://github.com/rieset/puppeteer-heroku/workflows/Linter/badge.svg)](https://github.com/rieset/puppeteer-heroku/actions)
[![Testing](https://github.com/rieset/puppeteer-heroku/workflows/Testing/badge.svg)](https://github.com/rieset/puppeteer-heroku/actions)

Puppeteer prepared for deployment on the Heroku server

## Chrome Driver on Heroku

Add chrome driver on Heroku:

```bash
  heroku buildpacks:add https://github.com/heroku/heroku-buildpack-chromedriver
  heroku buildpacks:add https://github.com/heroku/heroku-buildpack-google-chrome
  heroku config:set CHROME_DRIVER_PATH=/app/.chromedriver/bin/chromedriver
  heroku config:set CHROME_BINARY_PATH=/app/.apt/opt/google/chrome/chrome
```

You need used variable `CHROME_BINARY_PATH` and `CHROME_DRIVER_PATH` on backend

## Config env

```bash
  CHROME_WAIT_UNTIL=networkidle2
  [TOKEN_NAME]={host},{prefix},{width},{height}

  LABEL=Production
  INSTANCES=1
  MEMORY=256M
  SERVICE_NAME=PDF SERVICE
```

## Development

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
# install dependencies
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

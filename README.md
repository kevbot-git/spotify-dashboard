# [spotify-dashboard](http://spotify-dashboard-by-kevbot-git.s3-website-ap-southeast-2.amazonaws.com/)

This a Vue 3 application that is developed and built with Vite and is deployed as a static website to AWS S3.

### Requirements

- `node` `^14.0.0` to run and deploy the app
- `npm` to install app dependencies
- [`ngrok`](https://ngrok.com/) or equivalent for http tunneling
- [`nvm`](https://github.com/nvm-sh/nvm) (optional) to install the project’s recommended node version
- [`aws`](https://docs.aws.amazon.com/cli/latest/userguide/install-cliv2.html) (optional) for deploying to an AWS account

## Running local development

1. Create an app in the Spotify Developer Console
2. Create a file in the project’s root – `.env.local`:
```
VITE_SPOTIFY_CLIENT_ID=<your client id>
```
3. Run `npm install`
4. Run `npm run dev`
5. Use an http tunnel such as `ngrok` to expose your localhost port (probably 3000), for example, `ngrok http 3000`
6. Take the HTTP URL it tunnels to and add it as a ‘Redirect URI’ in your Spotify app, appending the path `/auth`.
7. Navigate to the tunnel’s URL in your browser

## Deploying to AWS S3

1. Authenticate your `aws` cli to point to the account and region you would like to deploy to (I used `ap-southeast-2`)
2. Optionally set or pass override env variables to the following command (`STACK_NAME=my-stack`, `BUCKET_NAME=my-unique-bucket`)
3. Run `npm run deploy`
4. Navigate your browser to `http://<BUCKET_NAME>.s3-website-<your aws region>.amazonaws.com/`

Note: after the stack is initialised, subsequent deployments take around 5 seconds.
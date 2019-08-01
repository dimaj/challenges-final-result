# Installation

1. `git clone git@github.com:mlapps/challenges-final-result.git`
2. `cd challenges-final-result`
3. `npm install`

Now please check if you can run index.html (using a web server or your IDE). 
If it works you're set up and ready to start building your app!

If you don't have a web server installed you could run instant-server from the directory:
```
sudo npm install -g instant-server
instant -p 8081 ./
```

# Building app distribution

Use the following steps to create a distribution:

Create a self-contained web-based distribution (HTML5) in dist/web:
`npm run release-web`

Create a Metrological platform package in dist/{appname}.mpkg.tgz:
`npm run release-mpkg`

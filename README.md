# React template using Vite

## How to run in development
Install Node.js using [NVM](https://github.com/nvm-sh/nvm#installing-and-updating) and Node Package
Manager using apt-get:
```
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```
*** Exit and log back into server ***
### Install and verify LTS version is used for Node
```
nvm install --lts
node -v
```


```
sudo apt-get install npm
```

Clone repository:
```
git clone [address]
```
OR
```
git clone [address]
```
***Navigate within the folder***

Install libraries:
```
npm install
```

Run in development mode (run from within the folder):
```
npm run dev
```

Or if you're working from a virtual machine and need to define a port number
```
npm run dev -- --port 3000
```


## How to deploy to production

***From within the folder***

Compile the project files for production deployment:
```
npm run build
```
***This will create a 'dist' folder, the contents of this folder will be used to serve your React web app. Move the contents to your server to begin hosting. Point your NGINX web server (or alternative) to the index.html file.***

```
dist/
├── assets
│   ├── index-6d4a3461.js
│   └── index-da4217ce.css
├── index.html
└── vite.svg
```

## Install Nginx
```
sudo apt-get install nginx
```
### Configure default file in sites-avalable folder.
```
sudo vi /etc/nginx/sites-available/default
```
Input the following, adjust the directories and file names as needed:

```
server {
        listen 443 ssl;
        ssl_certificate /etc/nginx/certificates/color.cornidez.com.pem;
        ssl_certificate_key /etc/nginx/certificates/color.cornidez.com.key;

        server_name color.cornidez.com;
        location / {
                root /var/www/front;
                index.html;
        }

        access_log /var/log/nginx/access.log;
        error_log  /var/log/nginx/error_log  crit;
}
```
### Test and restart service
```
sudo nginx -t
sudo service nginx restart
sudo service nginx status
```





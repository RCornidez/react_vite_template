# React template using Vite

## How to run in development
Install Node.js and Node Package Manager:
```
sudo apt-get install nodejs npm
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








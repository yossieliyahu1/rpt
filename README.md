

run:
>gulp bundle
>nodemon or node-debug ./server/main.js
>>> localhost:7777/

default user


{

	_id : "0_0",
	name: "Guest",
	email: "",
	userName: "",
	password: "",

	content : [   // an array of Squares
		{
			id: 1000001,
			title: "Apple",
			image: "/imgs/apple.jpg",
			link : "http://www.apple.com"
		},
		{
			id: 1000001,
			title: "Microsoft Corporation",
			image: "/imgs/microsoft.jpg",
			link : "http://www.microsoft.com"
		},
		{
			id: 1000001,
			title: "Google Search Engine, #1 on the Web",
			image: "/imgs/google.jpg",
			link : "http://www.google.com"
		},
		{
			id: 1000001,
			title: "Yahoo",
			image: "/imgs/yahoo.jpg",
			link : "http://www.yahoo.com"
		},
		{
			id: 1000001,
			title: "Youtube",
			image: "/imgs/youtube.jpg",
			link : "http://www.youtube.com"
		}
	]
}


npm install 
bower install
create .gitignore
npm install --save express
npm install --save ejs    // allow us to use .ejs files

create gulpfile.js
// gulp must be installed globaly and localy 
npm install -g gulp   
npm install --save gulp
npm install --save gulp-live-server

npm install --save browser-sync   // 

// An npm package to get you immediate access to React, without also requiring the JSX transformer
// This is especially useful for cases where you want to browserify your module using React.
npm install --save react 
bower install --save react


npm install -g react-tools  // for jsx command line tools 

now when we create a jsx file and put inside some jsx code - we need to compile it (automatically) to javascript 
use browserify!

*** NOTE: not all packages are compatible with browserify!! There are packages that can't run on the client!

1. npm makes it easy for JavaScript developers to share and reuse code, and it makes it easy to update the code that you're sharing.
2. now that you have npm packages for you to use you can:
	A. Client: include them on your html (javascript and css) (packages that can be used on the browser - on the front-end)
	B. Server: "require" the package (node modules that can be used on the server side)
3. Why not using the same way!!! simply use "browserify", it override "require" and package for you all the required js to use on the client.

browserify - help you write modular code (same on the client and server)
browserify - prevent "oncluding" lots of scripts inside your html

What browserify does? 
package all the "required" files and their dependancies and pipe it to a single file you can than include in your html

// we wil luse browserify to: 
// 1. turn jsx into javascript 
// 2. require jsx files within one another 
npm install -g browserify  

npm install --save browserify // you will also need to add local browserify
npm install --save reactify   // helps browserify to compile jsx
npm install --save vinyl-source-stream  // change/transform "gulp format" to static format that can be used by server (like express) ??? streams?files? 

// dispatcher 
npm install --save guid

// css
bower install --save skeleton

// 
npm install --save body-parser

npm install --save jquery

//db
npm install --save mongoose
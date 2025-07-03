# Autocomplete Backend

A backend for my [auto-complete](https://github.com/milana1726/autocomplete-be/blob/master/auto-complete/index.js) function.

## Setup

- Use `node 20.x` or higher.
- Clone this repo: `$ git clonehttps://github.com/milana1726/autocomplete-be.git`.
- Go to downloaded folder: `$ cd autocomplete-be`.
- Install dependencies: `$ npm install`.

## Running the Server

- **Compile TypeScript to JavaScript**    
To generate `dist` folder, run:     
`$ npm run build` or `$ tsc`.     
This command compiles the TypeScript files from the `src` directory into JavaScript and outputs them into the `dist` folder.
- **Development mode (watch + auto-restart):**    
`$ npm run dev`.     
This command uses `tsc-watch` to compile the TypeScript files and automatically restart the server `(dist/server.js)` whenever you make changes.      
- **Run directly with TypeScript (no build step):**     
  `$ npm run start`    
  This command starts the server directly using `ts-node`, without compiling TypeScript to JavaScript beforehand.

## Sending Requests

- Send `GET` requests to the root endpoint `/` with a `complete` query parameter:    
  `http://localhost:3000/?complete=java`.     
  You will get response with all suggestions for `java`:     

```
{
    "suggestions": [
        "Java",
        "Javalera",
        "Javarthushuu"
    ]
}
```

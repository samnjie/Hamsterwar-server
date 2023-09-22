const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const hamsters = require('./routes/hamsters.js')
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 1345
const staticFolder = path.join(__dirname, 'static')



// Middleware
app.use((req, res, next) =>{ // Logger
	console.log(`${req.method} ${req.url}`,  req.params );
	next()
})

app.use( express.json() )
app.use(bodyParser.json());
app.use( cors() )
app.use( express.static(staticFolder) )



// Routes

// REST API for /hamsters
app.use('/hamsters', hamsters);






// Starta servern 
app.listen(PORT, () => {
	console.log('Server listening on port ' + PORT);
})
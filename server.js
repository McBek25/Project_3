const express = require('express')
const logger = require('morgan')
const app = express()
const flightNumberRoutes = require('./routes/flightNumber.js')
const crewMemberRoutes = require('./routes/crewMember.js')

app.use(logger('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(`${__dirname}/client/build`))

app.use('/api/v1/member', crewMemberRoutes)
app.use('/api/v1', flightNumberRoutes)

app.get('/*', (req, res) => {
    res.sendFile(`${__dirname}/client/build/index.html`)
})

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
    console.log('App is up and running on port ' + PORT)
})
#!/usr/bin/env node

'use strict'

const
  express = require('express')
, port    = process.env.PORT || 2000
, app     = express()

app
.use(express.static(__dirname + '/zacanger'))
.use((req, res) => res.sendFile(__dirname + '/zacanger/404/index.html'))
.listen(port, () => console.log(`listening on ${port}`))


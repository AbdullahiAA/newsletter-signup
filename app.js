const express = require('express')
const bodyParser = require('body-parser')
const https = require('https')
const request = require('request')
const { json } = require('express')

const app = express()

const PORT = process.env.PORT || 3000

// This will allow the loading of the external files that are linked up to the signup.html file
app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: true}))


app.get('/', (req, res) => {
    res.sendFile(__dirname + '/signup.html')
})

app.post('/', (req, res) => {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email

    const data = {
        members: [
            {
                email_address: email,
                status: 'subscribed',
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data)

    const url = 'https://us7.api.mailchimp.com/3.0/lists/7206e54be3'

    const options = {
        method: 'POST',
        auth: 'techpro:887bc63f2266d1be14f9009ec29b2981-us7'
    }

    const request = https.request(url, options, (response) => {

    if (response.statusCode === 200) {
        res.sendFile(__dirname + '/success.html')
    } else {
        res.sendFile(__dirname + '/failure.html')
     }

    response.on('data', (data) => {
        console.log(JSON.parse(data));
    })
})

    request.write(jsonData)
    request.end()

})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

// API Key
// 887bc63f2266d1be14f9009ec29b2981-us7

// List Id
// 7206e54be3
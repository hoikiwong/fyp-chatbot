//This is still work in progress
/*
Please report any bugs to nicomwaks@gmail.com

i have added console.log on line 48 




 */
'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()

app.set('port', (process.env.PORT || 5000))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// index
app.get('/', function(req, res) {
    res.send('hello world i am a secret bot')
})

// for facebook verification
app.get('/webhook/', function(req, res) {
    if (req.query['hub.verify_token'] === 'my_voice_is_my_password_verify_me') {
        res.send(req.query['hub.challenge'])
    } else {
        res.send('Error, wrong token')
    }
})

// to post data
app.post('/webhook/', function(req, res) {
    let messaging_events = req.body.entry[0].messaging
    for (let i = 0; i < messaging_events.length; i++) {
        let event = req.body.entry[0].messaging[i]
        let sender = event.sender.id

        if (event.message && event.message.text) {
            let text = event.message.text
            replyMessagesEvent(sender, text)
            continue
        }









        if (event.postback) {
            let text = JSON.stringify(event.postback)
            replyPostBackEvent(sender, text)
            continue
        }
    }
    res.sendStatus(200)
})


// recommended to inject access tokens as environmental variables, e.g.
const token = process.env.FB_PAGE_ACCESS_TOKEN
// const token = "<FB_PAGE_ACCESS_TOKEN>"

//To-do
function replyMessagesEvent(sender, text) {
    // if (text === 'Generic') {

    // }

    //typing 3s -> send message
    setSenderAction(sender, "typing_on")
    setTimeout(
        function() {
            sendTextMessage(sender, "Message received" + sender)
            sendGenericMessage(sender)
            setSenderAction(sender, "typing_off")
        }, 3000);
}

//To-do
function replyPostBackEvent(sender, text) {
	var reply_text;
	//analyse the text
	switch(text){
		case "start_postback": 
			reply_text = "Choose one eye disease!"
	}



    setSenderAction(sender, "typing_on")
    setTimeout(
        function() {
            sendTextMessage(sender, "Postback received: " + text.substring(0, 200))
            // sendTextMessageWithQuickReplies(sender, reply_text)
            setSenderAction(sender, "typing_off")
        }, 1500);
}

function sendTextMessage(sender, text) {
    let messageData = { text: text }

    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: token },
        method: 'POST',
        json: {
            recipient: { id: sender },
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function sendTextMessageWithQuickReplies(sender, text) {
    let messageData = {
        "text": text,
        "quick_replies": [{
                "content_type": "text",
                "title": "色盲",
                "payload": "色盲",
                // "image_url": "http://example.com/img/red.png"
            },
            {
                //"content_type": "location"
                "content_type": "text",
                "title": "視網膜脫落",
                "payload": "視網膜脫落",
            },
            {
                "content_type": "text",
                "title": "青光眼",
                "payload": "青光眼"
            },
            {
                "content_type": "text",
                "title": "白內障",
                "payload": "白內障"
            }
        ]

    }

    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: token },
        method: 'POST',
        json: {
            recipient: { id: sender },
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function sendGenericMessage(sender) {
    let messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "First card",
                    "subtitle": "Element #1 of an hscroll",
                    "image_url": "http://messengerdemo.parseapp.com/img/rift.png",
                    "buttons": [{
                        "type": "web_url",
                        "url": "https://www.messenger.com",
                        "title": "web url"
                    }, {
                        "type": "postback",
                        "title": "Postback1",
                        "payload": "Payload for first element in a generic bubble",
                    }],
                }, {
                    "title": "Second card",
                    "subtitle": "Element #2 of an hscroll",
                    "image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
                    "buttons": [{
                        "type": "postback",
                        "title": "Postback2",
                        "payload": "Payload for second element in a generic bubble",
                    }],
                }]
            }
        }
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: token },
        method: 'POST',
        json: {
            recipient: { id: sender },
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

function setSenderAction(sender, action) {
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: { access_token: token },
        method: 'POST',
        json: {
            recipient: { id: sender },
            sender_action: action,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}

// spin spin sugar
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})
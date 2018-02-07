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
    var reply_text = "Message received";
    var defaultCase = false;

    switch (text) {
        case "hi":
            //To-do: using event.sender.id(sender) to get profile such as username
            reply_text = "Hello!"
            break

        case "色盲":
        case "視網膜脫落":
        case "青光眼":
        case "白內障":
            reply_text = "你已選擇了 - " + text
            break




        default:
            //reply_text = text;
            reply_text = "請選擇一種眼疾!"
            defaultCase = true
    }

    //typing 3s -> send text message
    setSenderAction(sender, "typing_on")
    setTimeout(
        function() {
            // ****************** Call API to send message
            
            if (defaultCase){
            	sendTextMessageWithQuickReplies(sender, reply_text)
            } else {
            	sendTextMessage(sender, reply_text)
            }
                   
            if (text == "色盲" || text == "視網膜脫落" || text == "青光眼" || text == "白內障") {
                sendGenericMessage(sender)
                //sendButtonTemplate(sender)
            }

            // ******************

            setSenderAction(sender, "typing_off")
        }, 1500);


}

//To-do
function replyPostBackEvent(sender, text) {
    var reply_text = "Postback received!";
    //analyse the text
    // console.log("Type of postback text:     " + typeof text)
    var user_input = JSON.parse(text);
    switch (user_input.payload) {
        case "start_postback":
            //Get started by user 
            reply_text = "請選擇一種眼疾!"
            break;

    }



    setSenderAction(sender, "typing_on")
    setTimeout(
        function() {
            // ****************** Call API to send message
            // sendTextMessage(sender, "Postback received: " + text.substring(0, 200))
            sendTextMessageWithQuickReplies(sender, reply_text)
            // ******************

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
                "payload": "color blindness",
                // "image_url": "http://example.com/img/red.png"
            },
            {
                //"content_type": "location"
                "content_type": "text",
                "title": "視網膜脫落",
                "payload": "retinal detachment",
            },
            {
                "content_type": "text",
                "title": "青光眼",
                "payload": "glaucoma"
            },
            {
                "content_type": "text",
                "title": "白內障",
                "payload": "cataract"
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

//色盲: 成因 分類 預防 治療方式 遺傳
//https://kknews.cc/health/nxm23l3.html
function sendGenericMessage(sender) {
    let buttonContent1 = [
    	{
            "type": "postback",
            "title": "成因",
            "payload": "cause"
        },
        {
            "type": "postback",
            "title": "分類",
            "payload": "classfication"
        },
        {
            "type": "postback",
            "title": "預防",
            "payload": "classfication"
        },
    ];

    let buttonContent2 = [
    	{
            "type": "web_url",
            "url": "https://www.messenger.com",
            "title": "web url"
        },
        {
            "type": "postback",
            "title": "Postback2",
            "payload": "Payload for second element in a generic bubble",
        }
    ];


    let messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                        "title": "First card",
                        "subtitle": "Element #1 of an hscroll",
                        // "image_url": "http://messengerdemo.parseapp.com/img/rift.png",
                        "buttons": buttonContent1
                    },
                    {
                        "title": "Second card",
                        "subtitle": "Element #2 of an hscroll",
                        // "image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
                        "buttons": buttonContent2
                    }
                ]
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

function sendButtonTemplate(sender) {
    let messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "button",
                "text": "Choose one of the followings",
                "buttons": [{
                        "type": "web_url",
                        "url": "https://www.messenger.com",
                        "title": "Visit Messenger"
                    },
                    {
                        "type": "web_url",
                        "url": "https://www.messenger.com",
                        "title": "Visit Messenger"
                    },
                    {
                        "type": "web_url",
                        "url": "https://www.messenger.com",
                        "title": "Visit Messenger"
                    }
                ]
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
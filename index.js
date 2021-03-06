//This is still work in progress
/*
Please report any bugs to nicomwaks@gmail.com

i have added console.log on line 48 




 */
'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
// var strings = require('node-strings');
const app = express()

app.set('port', (process.env.PORT || 5000))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// index
app.get('/', function(req, res) {
    console.log("test".underline())
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
    // var defaultCase = false;

    switch (text) {
        case "Hi":
            //To-do: using event.sender.id(sender) to get profile such as username
            reply_text = "Hello!"
            // defaultCase = true
            setSenderAction(sender, "typing_on")
            setTimeout(
                function() {
                    // ****************** Call API to send message
                    sendTextMessageWithQuickReplies(sender, reply_text)
                    // ******************

                    setSenderAction(sender, "typing_off")
                }, 500);
            break

        case "色盲":
        case "視網膜脫落":
        case "青光眼":
        case "白內障":
            reply_text = "你已選擇了 - " + text
            setSenderAction(sender, "typing_on")
            setTimeout(
                function() {
                    // ****************** Call API to send message
                    sendTextMessage(sender, reply_text)

                    setTimeout(
                        function() {
                            //generic       
                            sendGenericMessage(sender, text)
                            //sendButtonTemplate(sender)
                            //generic
                        }, 500
                    )
                    // ******************
                    setSenderAction(sender, "typing_off")
                }, 1500);
            break




        default:
            reply_text = "Sorry ar 我唔明你講緊咩 我仲慢慢學緊😢"
            setSenderAction(sender, "typing_on")
            setTimeout(
                function() {
                    // ****************** Call API to send message
                    sendTextMessageWithQuickReplies(sender, reply_text)
                    // ******************

                    setSenderAction(sender, "typing_off")
                }, 1000);

    }


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
            setSenderAction(sender, "typing_on")
            setTimeout(
                function() {
                    // ****************** Call API to send message
                    // sendTextMessage(sender, "Postback received: " + text.substring(0, 200))
                    sendTextMessageWithQuickReplies(sender, reply_text)
                    // ******************

                    setSenderAction(sender, "typing_off")
                }, 1500);
            break;


        case "color-definition":
            reply_text = "色盲係對眼分唔清部份 甚至全部顏色嘅病🤔"
            setSenderAction(sender, "typing_on")
            setTimeout(
                function() {
                    // ****************** Call API to send message
                    // sendTextMessage(sender, "Postback received: " + text.substring(0, 200))
                    sendTextMessageWithQuickReplies(sender, reply_text)
                    // ******************

                    setSenderAction(sender, "typing_off")
                }, 1000);
            break;

        case "color-cause":
            // reply_text = "成因分為先天性和後天性。\n前者是一種遺傳疾病，後者由視器官疾病引起"
            reply_text = "色盲其實分為色盲同色弱\n色盲就係先天性既缺陷 等G啦😈\n色弱主要係遺傳 不過後天既眼疾都有可能引致色弱"

            //https://read01.com/zh-hk/d0GEgk.html#.Wnrha1T1X-Y
            setSenderAction(sender, "typing_on")
            setTimeout(
                function() {
                    // ****************** Call API to send message
                    // sendTextMessage(sender, "Postback received: " + text.substring(0, 200))
                    sendTextMessageWithQuickReplies(sender, reply_text)
                    // ******************

                    setSenderAction(sender, "typing_off")
                }, 1500);
            break;

        case "color-classfication":
            // var r1 = "全色盲: 患者只係分到光暗 分唔到顏色 佢地會見到紅色發暗 藍色光亮\n\n"
            // var r2 = "紅色盲: 患者主要分唔到紅色 佢地會將綠色當成黃色 紫色當成藍色\n\n"
            // var r3 = "綠色盲: 患者主要分唔到綠色 佢地會將綠色睇成灰色或者暗黑色\n\n"
            // var r4 = "藍黃色盲: 患者分唔到藍色同黃色 但係分辨到紅色同綠色\n\n"
            // var r5 = "全色弱: 患者分得到顏色鮮明嘅物體 但係分唔到顏色唔飽和嘅野\n\n"
            // var r6 = "部份色弱: 患者分為紅色弱、綠色弱同藍黃色弱 咁紅綠色弱就最常見 佢地係暗嘅地方時 會分唔清紅綠色"

            //https://read01.com/zh-hk/2dOeaj.html#.Wst3XlT1X-Y
            setSenderAction(sender, "typing_on")
            setTimeout(
                function() {
                    // ****************** Call API to send message
                    // sendTextMessage(sender, "Postback received: " + text.substring(0, 200))
                    // sendTextMessageWithQuickReplies(sender, reply_text)
                    sendGenericMessage(sender, user_input.payload)
                    // ******************

                    setSenderAction(sender, "typing_off")
                }, 1500);
            break;

        case "全色盲":
            reply_text = "全色盲: 患者只係分到光暗 分唔到顏色 佢地會見到紅色發暗 藍色光亮😞"
            setSenderAction(sender, "typing_on")
            setTimeout(
                function() {
                    // ****************** Call API to send message
                    // sendTextMessage(sender, "Postback received: " + text.substring(0, 200))
                    sendTextMessageWithQuickReplies(sender, reply_text)
                    // ******************

                    setSenderAction(sender, "typing_off")
                }, 1000);
            break;

        case "紅色盲":
            reply_text = "紅色盲: 患者主要分唔到紅色 佢地會將綠色當成黃色 紫色當成藍色😟"
            setSenderAction(sender, "typing_on")
            setTimeout(
                function() {
                    // ****************** Call API to send message
                    // sendTextMessage(sender, "Postback received: " + text.substring(0, 200))
                    sendTextMessageWithQuickReplies(sender, reply_text)
                    // ******************

                    setSenderAction(sender, "typing_off")
                }, 1000);
            break;

        case "綠色盲":
            reply_text = "綠色盲: 患者主要分唔到綠色 佢地會將綠色睇成灰色或者暗黑色😔"
            setSenderAction(sender, "typing_on")
            setTimeout(
                function() {
                    // ****************** Call API to send message
                    // sendTextMessage(sender, "Postback received: " + text.substring(0, 200))
                    sendTextMessageWithQuickReplies(sender, reply_text)
                    // ******************

                    setSenderAction(sender, "typing_off")
                }, 1000);
            break;

        case "藍黃色盲":
            reply_text = "藍黃色盲: 患者分唔到藍色同黃色 但係分辨到紅色同綠色🙁"
            setSenderAction(sender, "typing_on")
            setTimeout(
                function() {
                    // ****************** Call API to send message
                    // sendTextMessage(sender, "Postback received: " + text.substring(0, 200))
                    sendTextMessageWithQuickReplies(sender, reply_text)
                    // ******************

                    setSenderAction(sender, "typing_off")
                }, 1000);
            break;

        case "全色弱":
            reply_text = "全色弱: 患者分得到顏色鮮明嘅物體 但係分唔到顏色唔飽和嘅野😢"
            setSenderAction(sender, "typing_on")
            setTimeout(
                function() {
                    // ****************** Call API to send message
                    // sendTextMessage(sender, "Postback received: " + text.substring(0, 200))
                    sendTextMessageWithQuickReplies(sender, reply_text)
                    // ******************

                    setSenderAction(sender, "typing_off")
                }, 1000);
            break;

        case "部份色弱":
            reply_text = "部份色弱: 患者分為紅色弱、綠色弱同藍黃色弱 咁紅綠色弱就最常見 佢地係暗嘅地方時 會分唔清紅綠色😕"
            setSenderAction(sender, "typing_on")
            setTimeout(
                function() {
                    // ****************** Call API to send message
                    // sendTextMessage(sender, "Postback received: " + text.substring(0, 200))
                    sendTextMessageWithQuickReplies(sender, reply_text)
                    // ******************

                    setSenderAction(sender, "typing_off")
                }, 1000);
            break;


        case "color-prevention":
            // reply_text = "你可以透過食野去預防色盲\n食d含維生素A同C既食物 含鈣食物 同埋鹼性食物 會幫到手！"
            var text1 = "優生優育方面: 男色盲患者要同正常人結婚 仲要選擇生仔👪 女色盲患者都係要同正常人結婚 同埋要揀生女👨‍👩‍👧"
            var text2 = "日常飲食方面: 食啲含維生素A同C嘅食物，含鈣鉻食物，鹼性食物 同埋含核黃素食物 都可以預防色盲💫"
            reply_text = text1 + "\n\n" + text2
            //https://read01.com/DA3djJ.html#.Ws458dNuaqA
            setSenderAction(sender, "typing_on")
            setTimeout(
                function() {
                    // ****************** Call API to send message
                    // sendTextMessage(sender, "Postback received: " + text.substring(0, 200))
                    sendTextMessageWithQuickReplies(sender, reply_text)
                    // ******************

                    setSenderAction(sender, "typing_off")
                }, 1200);
            break;

        case "color-treatment":
            var text1 = "先天性色盲: 醫學上暫時無真正既治療方法😢 但係可以用色盲眼鏡去改善色盲問題👍🏻"
            var text2 = "後天性色盲: 由於眼部或者大腦視覺中樞疾病導致 所以醫好本身嗰病就搞掂啦😎 "
            reply_text = text1 + "\n\n" + text2

            //http://www.jiankanghou.com/jibing/33222.html

            setSenderAction(sender, "typing_on")
            setTimeout(
                function() {
                    // ****************** Call API to send message
                    // sendTextMessage(sender, "Postback received: " + text.substring(0, 200))
                    sendTextMessageWithQuickReplies(sender, reply_text)
                    // ******************

                    setSenderAction(sender, "typing_off")
                }, 1200);
            break;

        case "comming soon":
            reply_text = "The function is comming soon!"

            setSenderAction(sender, "typing_on")
            setTimeout(
                function() {
                    // ****************** Call API to send message
                    // sendTextMessage(sender, "Postback received: " + text.substring(0, 200))
                    sendTextMessageWithQuickReplies(sender, reply_text)
                    // ******************

                    setSenderAction(sender, "typing_off")
                }, 500);
            break;

        default:
            reply_text = "未handle呢個postback!"
            setSenderAction(sender, "typing_on")
            setTimeout(
                function() {
                    // ****************** Call API to send message
                    // sendTextMessage(sender, "Postback received: " + text.substring(0, 200))
                    sendTextMessageWithQuickReplies(sender, reply_text)
                    // ******************

                    setSenderAction(sender, "typing_off")
                }, 500);
    }

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

//色盲: 定義 成因 分類 預防 治療方法
//https://kknews.cc/health/nxm23l3.html
function sendGenericMessage(sender, text) {
    let buttonContent1;
    let buttonContent2;
    
    switch (text) {
        case "色盲":
            buttonContent1 = [{
                    "type": "postback",
                    "title": "定義",
                    "payload": "color-definition"
                },
                {
                    "type": "postback",
                    "title": "成因",
                    "payload": "color-cause"
                },
                {
                    "type": "postback",
                    "title": "分類",
                    "payload": "color-classfication"
                }

            ];

            buttonContent2 = [{
                    "type": "postback",
                    "title": "預防",
                    "payload": "color-prevention"
                },
                {
                    "type": "postback",
                    "title": "治療方法",
                    "payload": "color-treatment"
                },
                {
                    "type": "web_url",
                    "url": "https://zh.wikipedia.org/wiki/%E8%89%B2%E7%9B%B2",
                    "title": "更多"
                }
            ];
            break;

        case "color-classfication":
            buttonContent1 = [{
                    "type": "postback",
                    "title": "全色盲",
                    "payload": "全色盲"
                },
                {
                    "type": "postback",
                    "title": "紅色盲",
                    "payload": "紅色盲"
                },
                {
                    "type": "postback",
                    "title": "綠色盲",
                    "payload": "綠色盲"
                }

            ];

            buttonContent2 = [{
                    "type": "postback",
                    "title": "藍黃色盲",
                    "payload": "藍黃色盲"
                },
                {
                    "type": "postback",
                    "title": "全色弱",
                    "payload": "全色弱"
                },
                {
                    "type": "postback",
                    "title": "部份色弱",
                    "payload": "部份色弱"
                }
            ];
            break;

        //Todo: handle other eye diseases (1)retinal detachment, (2)glaucoma, (3)cataract
        case "視網膜脫落":
            buttonContent1 = [{
                  "title":"定義",
                  "type":"postback",
                  "payload":"comming soon"
                },
                {
                  "title":"成因",
                  "type":"postback",
                  "payload":"comming soon"
                },
                {
                  "title":"分類",
                  "type":"postback",
                  "payload":"comming soon"
                }

            ];

            buttonContent2 = [{
                  "title":"預防",
                  "type":"postback",
                  "payload":"comming soon"
                },
                {
                  "title":"治療方法",
                  "type":"postback",
                  "payload":"comming soon"
                },
                {
                    "type": "web_url",
                    "url": "https://zh.wikipedia.org/zh-hk/%E8%A7%86%E7%BD%91%E8%86%9C%E8%84%B1%E8%90%BD",
                    "title": "更多"
                }
            ];
            break;

        case "青光眼":
            buttonContent1 = [{
                  "title":"定義",
                  "type":"postback",
                  "payload":"comming soon"
                },
                {
                  "title":"成因",
                  "type":"postback",
                  "payload":"comming soon"
                },
                {
                  "title":"分類",
                  "type":"postback",
                  "payload":"comming soon"
                }

            ];

            buttonContent2 = [{
                  "title":"症狀",
                  "type":"postback",
                  "payload":"comming soon"
                },
                {
                  "title":"治療方法",
                  "type":"postback",
                  "payload":"comming soon"
                },
                {
                    "type": "web_url",
                    "url": "https://zh.wikipedia.org/zh-hk/%E9%9D%92%E5%85%89%E7%9C%BC",
                    "title": "更多"
                }
            ];
            break;

        case "白內障":
            buttonContent1 = [{
                  "title":"定義",
                  "type":"postback",
                  "payload":"comming soon"
                },
                {
                  "title":"成因",
                  "type":"postback",
                  "payload":"comming soon"
                },
                {
                  "title":"分類",
                  "type":"postback",
                  "payload":"comming soon"
                }

            ];

            buttonContent2 = [{
                  "title":"預防",
                  "type":"postback",
                  "payload":"comming soon"
                },
                {
                  "title":"治療方法",
                  "type":"postback",
                  "payload":"comming soon"
                },
                {
                    "type": "web_url",
                    "url": "https://zh.wikipedia.org/zh-hk/%E7%99%BD%E5%86%85%E9%9A%9C",
                    "title": "更多"
                }
            ];
            break;

        default:
            buttonContent1 = [{
                    "type": "postback",
                    "title": "成因-other",
                    "payload": "cause"
                },
                {
                    "type": "postback",
                    "title": "分類-other",
                    "payload": "classfication"
                },
                {
                    "type": "postback",
                    "title": "預防-other",
                    "payload": "prevention"
                }
            ];

            buttonContent2 = [{
                    "type": "postback",
                    "title": "遺傳-other",
                    "payload": "genetic"
                },
                {
                    "type": "postback",
                    "title": "治療方法-other",
                    "payload": "treatment"
                },
                {
                    "type": "web_url",
                    "url": "https://zh.wikipedia.org/wiki/%E8%89%B2%E7%9B%B2",
                    "title": "更多-other"
                }
            ];
    }



    let messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                        "title": "請選擇以下一項:",
                        // "subtitle": "Element #1 of an hscroll",
                        // "image_url": "http://messengerdemo.parseapp.com/img/rift.png",
                        "buttons": buttonContent1
                    },
                    {
                        "title": "請選擇以下一項:",
                        // "subtitle": "Element #2 of an hscroll",
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
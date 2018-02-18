// Copyright 2017, Google, Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//    http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

'use strict';

const express = require('express');

const app = express(),
path = require('path'),
nodeMailer = require('nodemailer'),
bodyParser = require('body-parser');

app.set('view engine', 'ejs');
// [START hello_world]
app.use(express.static('public'));
// [END hello_world]

app.get('/', function (req, res) {
  res.render('index');
});

app.post('/send-email', function (req, res) {
  let transporter = nodeMailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
          user: 'jersonjanke',
          pass: 'cradle13'
      }
  });
  let mailOptions = {
      from: '"Jerson Janke" <jersonjanke@gmail.com>', // sender address
      to: "jersonjanke@gmail.com>", // list of receivers
      subject: "Title node", // Subject line
      text: "Test", // plain text body
      html: '<b>NodeJS Email Tutorial</b>' // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
          res.render('index');
      });
  });

if (module === require.main) {
  // [START server]
  // Start the server
  const server = app.listen(process.env.PORT || 8080, () => {
    const port = server.address().port;
    console.log(`App listening on port ${port}`);
  });
  // [END server]
}

module.exports = app;
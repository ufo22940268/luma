/**
 * Created by cc on 2020/12/19.
 */
"use strict";
const {WebClient} = require('@slack/web-api');
const token = process.env.SLACK_TOKEN;

const web = new WebClient(token);
module.exports = web;

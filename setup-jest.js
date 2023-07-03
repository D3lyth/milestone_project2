/* jshint esversion: 11, jquery: true */

const $ = require('jquery');
global.$ = global.jQuery = $;

const { JSDOM } = require('jsdom');

const { window } = new JSDOM();
global.document = window.document;
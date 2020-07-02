// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#FFFFFF'}, function() {});
  
  // chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
  //   chrome.declarativeContent.onPageChanged.addRules([{
  //     conditions: [new chrome.declarativeContent.PageStateMatcher({
  //       pageUrl: {hostContains: 'joinhandshake.com'},
  //     }),
  //     new chrome.declarativeContent.PageStateMatcher({
  //       pageUrl: {hostContains: 'indeed.com'},
  //     }),
  //     new chrome.declarativeContent.PageStateMatcher({
  //       pageUrl: {hostContains: 'linkedin.com'},
  //     }),
  //     new chrome.declarativeContent.PageStateMatcher({
  //       pageUrl: {hostContains: 'dice.com'},
  //     }),
  //     new chrome.declarativeContent.PageStateMatcher({
  //       pageUrl: {hostContains: 'careerbuilder.com'},
  //     }),
  //     new chrome.declarativeContent.PageStateMatcher({
  //       pageUrl: {hostContains: 'monster.com'},
  //     }),
  //     new chrome.declarativeContent.PageStateMatcher({
  //       pageUrl: {hostContains: 'glassdoor.com'},
  //     }),
  //     new chrome.declarativeContent.PageStateMatcher({
  //       pageUrl: {hostContains: 'ziprecruiter.com'},
  //     }),
  //     new chrome.declarativeContent.PageStateMatcher({
  //       pageUrl: {hostContains: 'simplyhired.com'},
  //     }),
  //     new chrome.declarativeContent.PageStateMatcher({
  //       pageUrl: {hostContains: 'upwork.com'},
  //     })
  //     ],
  //         actions: [new chrome.declarativeContent.ShowPageAction()]
  //   }]);
  // });
});
// const watchlist =['joinhandshake.com','indeed.com','linkedin.com','dice.com','careerbuilder.com','monster.com','glassdoor.com','ziprecruiter.com','simplyhired.com','upwork.com'];

chrome.tabs.onActivated.addListener(function(){
  chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
  let url = tabs[0].url;
  if(url[0]!=='h'){
    chrome.browserAction.setBadgeText({'text': ''  });
    return;
  }
  let host = new URL(url)
  // if (!watchlist.includes(host.hostname.substring(4))){
  //   chrome.browserAction.setBadgeText({'text': ''  });
  //   return;
  //  }
  url =  url.split('?')[0];
  const current = new Date();
  chrome.storage.sync.get(url, function(result) {
    if(result[url] === undefined||result[url]["times"]===0){  
      chrome.storage.sync.set({[url]:{"times":1,"date":current.toDateString()}}, function() {});
      chrome.browserAction.setBadgeText({text: "1"});
      chrome.browserAction.setBadgeBackgroundColor({color: "#909090"});
      
    }  
    else{ 
      let n = result[url]["times"] ;
      chrome.storage.sync.set({[url]:{"times":n+1, "date":current.toDateString()}}, function() {});
      chrome.browserAction.setBadgeBackgroundColor({color: "#FF0000"});
      chrome.browserAction.setBadgeText({text: (n+1).toString()});
    }
});
});
});


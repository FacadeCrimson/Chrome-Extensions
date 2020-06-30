// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
'use strict';

chrome.runtime.onInstalled.addListener(function() {
  // chrome.storage.sync.set({domain:'gwu.joinhandshake.com'}, function() {});

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: {hostEquals: 'gwu.joinhandshake.com'},
      })
      ],
          actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

chrome.tabs.onActivated.addListener(function(){
  chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
  let url = tabs[0].url;
  if (url.substring(0,29)!=="https://gwu.joinhandshake.com"){
    return;
   }
  chrome.storage.sync.get(url, function(result) {
    if(result[url] === undefined){
      chrome.storage.sync.set({[url]:1}, function() {});
    }  
    else{ 
      let n = result[url] ;
      chrome.storage.sync.set({[url]:n+1}, function() {});
    }
 });
});
});

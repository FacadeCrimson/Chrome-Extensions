// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';


let message = document.getElementById('message');

chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
  let url = tabs[0].url;

  chrome.storage.sync.get(url, function(result) {
    if(result[url] === undefined){
      message.innerHTML="You have never visited this website before.";
    }  
    else{ 
      message.innerHTML="You have visited this site "+result[url]+" times."; 
    }
 });
});

let clear = document.getElementById('clear')

clear.onclick = function() {
  chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let url = tabs[0].url;
    chrome.storage.sync.set({[url]:0}, function() {});
  });
  window.location.reload();

};
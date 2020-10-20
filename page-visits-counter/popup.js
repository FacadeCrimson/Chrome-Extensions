// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let container = document.getElementById('container');
chrome.storage.sync.get('color',function(result) {
  container.style.backgroundColor=result.color;
});

let counter = document.getElementById('counter');
let show = document.getElementById('show');
let time = document.getElementById('time');

chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
  let url = tabs[0].url;
  url =  url.split('?')[0];

  chrome.storage.local.get(url, function(result) {
    if(result[url]["times"] === 1){
      time.innerHTML="You have never visited this webpage before.";
      show.style.display="none";
    }  
    else{ 
      time.innerHTML=result[url]["date"];
    }
    counter.innerHTML=result[url]["times"]+" times"; 
 });
});

let content = document.getElementById('content');
chrome.storage.sync.get("filter",function(result) {
chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
  chrome.tabs.sendMessage(tabs[0].id,{method: "getText"}, function(response) {
    if(response.method=="getText"){
        var message=""
        const data = response.data.toLowerCase()
          for(let x of result.filter){
            if(data.includes(x)){
              message=message+`Contains ${x}\n`
            }
          }
        content.innerText=message;
    }
}) }) });

let clear = document.getElementById('clear')

clear.onclick = function() {
  chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
    let url = tabs[0].url;
    url =  url.split('?')[0];
    chrome.storage.local.set({[url]:{"times":0}}, function() {});
  });
  window.location.reload();
};

let stop = document.getElementById('stop');
chrome.storage.local.get("state",function(result) {
  stop.innerText = result.state==="start"?"Stop":"Start"
})

stop.onclick = function() {
  if(stop.innerText==="Stop"){
    chrome.storage.local.set({state:"stop"},function() { window.location.reload();})
  }
  else{
    chrome.storage.local.set({state:"start"},function() { window.location.reload();})
  }
};

let option = document.getElementById('option')

option.onclick = function() {
  chrome.tabs.create({ 'url': 'chrome://extensions/?options=' + chrome.runtime.id });
};
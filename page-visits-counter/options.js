// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let button1 = document.getElementById('colorsubmit');

button1.onclick = function() {
  let message = document.getElementById('message');
  message.style.opacity=1;
  var myInterval = setInterval(function(){
    message.style.opacity=0;
    clearInterval(myInterval);
  },2000)
  let back = document.getElementById('colorinput').value;
  chrome.storage.sync.set({color: back}, function() {
    console.log('color is ' + back);
  })
  };

let clear= document.getElementById('delete');

clear.onclick = function() {
  chrome.storage.local.clear(function() {
    var error = chrome.runtime.lastError;
    if (error) {
        console.error(error);
    }
  });
};

let wordlist = document.getElementById("wordlist")

chrome.storage.sync.get('filter',function(result) {
  if(result.filter.length>0){
      result.filter.map((v)=>{
      let x = document.createElement('li')
      x.innerText = v + '\xa0\xa0\xa0'
      let button = document.createElement('button')
      button.classList.add("delete")
      button.id = v
      button.innerText = "x"
      button.onclick=function(e){
        chrome.storage.sync.get('filter',function(result) {
          let newFilter = result.filter
          newFilter = newFilter.filter(item => item !== e.target.id)
          chrome.storage.sync.set({filter: newFilter}, function() {
          location.reload()
        })})
      }
      x.appendChild(button)
      wordlist.appendChild(x)})
  }
  else{
    let s = document.createElement("li")
    s.innerText = "No words yet!"
    wordlist.appendChild(s)
  }
});

let button2 = document.getElementById('filtersubmit');

button2.onclick = function() {
  let back = document.getElementById('filterinput').value;
  chrome.storage.sync.get('filter',function(result) {
      let newFilter = result.filter
      newFilter.push(back) 
      chrome.storage.sync.set({filter: newFilter}, function() {
      location.reload()
    })
})};

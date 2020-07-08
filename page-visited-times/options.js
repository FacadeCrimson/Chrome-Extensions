// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let button = document.getElementById('submit');

button.onclick = function() {
  let message = document.getElementById('message');
  message.style.opacity=1;
  let back = document.getElementById('input').value;
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
// ==UserScript==
// @name         Trello notif crusher
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Use shortcuts to open the notification modal of Trello, and Mark All as Read.
// @author       Flavien
// @match        https://trello.com/*
// @grant        none
// ==/UserScript==


// Click the bell icon at the top right.
function clickNotificationButton() {
        document.querySelector('button[data-test-id="header-notifications-button"]').click();
        // Blur the button, otherwise clicking again will just focus it.
        document.querySelector('button[data-test-id="header-notifications-button"]').blur();
}

// Click "Mark All as Read" in the notifications panel.
function clickMarkAllAsRead() {
    document.querySelector('button[data-test-id="mark-all-read-button"]').click();
}

// Map clicking actions to keyboard shortcuts.
function keyupToNotifPanel(e) {
    // Enable the keyboard shortcut only of the active element of the page is <body> (initial state) or <div> (the notification panel is open)
    if (document.activeElement.tagName !== "BODY" && document.activeElement.tagName !== "DIV"){
        return;
    }
    switch(e.key){
        // Open the panel.
        case "u":
            clickNotificationButton();
            break;
        // Mark all as read + close the panel.
        case "e":
            clickMarkAllAsRead();
            clickNotificationButton();
    }
}

// Add the event listener.
(function() {
    'use strict';
    document.addEventListener('keyup', keyupToNotifPanel, false);
})();
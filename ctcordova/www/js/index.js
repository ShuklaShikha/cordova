/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready

document.addEventListener('deviceready', onDeviceReady, false);
document.getElementById("onuserlogin").addEventListener("click", onuserlogin);
document.getElementById("eventpush").addEventListener("click", EventPush);
document.getElementById("productpush").addEventListener("click", ProductView);
document.getElementById("showinbox").addEventListener('onCleverTapInboxDidInitialize',"click", ShowInbox);
document.getElementById("charge").addEventListener("click", Charge);
document.getElementById("shownative").addEventListener("click", NativeDisplay);
function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.getElementById('deviceready').classList.add('ready');
}

document.getElementById("onuserlogin").addEventListener("click",onuserlogin);
function onuserlogin(){

    var stuff = ["bags", "shoes"];
    var profile = {
    'Name': 'capt',
    'Identity': '999',
    'Email': 'captain@america.com',
    'Phone': '+14155551234',
    'stuff': stuff
}
CleverTap.onUserLogin(profile);

}
function EventPush(){
    CleverTap.recordEventWithName("Cordova Push Event");
}
function ProductView(){
    CleverTap.recordEventWithNameAndProps("Product View", {"Name":"F"});
    CleverTap.getAllInboxMessages(function(val) {console.log("Inbox messages are "+val);});
  }
function ShowInbox(){
    CleverTap.ShowInbox({"navBarTitle":"App Inbox","navBarColor":"#FF5B5B"});
  }
  
  function Charge(){
    CleverTap.recordEventWithName("Cordova Charge");
   var chargeDetails = { 'totalValue': 20,
                         'category': 'books',
                         'purchase_date': new Date()
                       }
   var items = [
   { 'title': 'book1', 'published_date': new Date('2010-12-12T06:35:31'), 'author': 's' },
   { 'title': 'book2', 'published_date': new Date('2020-12-12T06:35:31'), 'author': 'F' },
   { 'title': 'book3', 'published_date': new Date('2000-12-12T06:35:31'), 'author': 'j' }]

   CleverTap.recordChargedEventWithDetailsAndItems(chargeDetails, items);
  }

  function NativeDisplay(){
    CleverTap.recordEventWithName("Cordova Native");
    CleverTap.getAllDisplayUnits(function(val) {
    document.getElementById("nativemsg").innerHTML =JSON.stringify(val[0].content[0].message.text).replace(/['"]+/g, '');
    document.getElementById("nativetitle").innerHTML =JSON.stringify(val[0].content[0].title.text).replace(/['"]+/g, '');
    console.log("Native haha Display units are "+JSON.stringify(val[0].content[0].message.text));
    });
  }
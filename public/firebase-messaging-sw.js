importScripts("https://www.gstatic.com/firebasejs/7.14.6/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/7.14.6/firebase-messaging.js"
);
importScripts("https://unpkg.com/shimport@2.0.5/index.js");
const { href } = new URL("config.js", location.href);
__shimport__.load(href).then(({ firebaseConfig }) => {
  firebase.initializeApp(firebaseConfig);
  firebase.messaging();
});

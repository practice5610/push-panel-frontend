import("/config.js")
  .then(({ API_URL, firebaseConfig, publicVapidKey }) => {
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();
    const messaging = firebase.messaging();
    messaging.getToken({ vapidKey: publicVapidKey }).then((token) => {
      console.log(token);
      if (localStorage.getItem("tokenSent")) return;
      // Send token to server
      const header = new Headers();
      header.append("Content-Type", "application/json");
      const body = {
        sitename: location.hostname,
        country: "India",
        token: token,
      };
      fetch(`${API_URL}/user/subscribe`, {
        method: "POST",
        headers: header,
        body: JSON.stringify(body),
      }).then(() => {
        localStorage.setItem("tokenSent", true);
      });
    });
  })
  .catch(console.error);

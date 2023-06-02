import React from "react";

export default function Integrate() {
  return (
    <div>
      <div class="container-fluid" style={{ paddingTop: 40 }}>
        <h2>Instructions</h2>
        <p>
          To have the notification feature on any website, you just need to
          enter these three lines of code before &lt;/body&gt; close{" "}
        </p>
        <code class="text-primary">
          &lt;script
          src="https://www.gstatic.com/firebasejs/8.2.2/firebase-app.js"&gt;&lt;/script&gt;
        </code>
        <br />
        <code class="text-primary">
          &lt;script
          src="https://www.gstatic.com/firebasejs/8.2.2/firebase-analytics.js"&gt;&lt;/script&gt;
        </code>
        <br />
        <code class="text-primary">
          &lt;script
          src="https://www.gstatic.com/firebasejs/8.2.2/firebase-messaging.js"&gt;&lt;/script&gt;
        </code>
        <br />
        <code class="text-primary">
          &lt;script type="text/javascript"
          src="/integrate.js"&gt;&lt;/script&gt;
        </code>
        <br />

        <br />
        <p>Download and put the following files in the root directory</p>
        <p>
          firebase-messaging-sw.js{" "}
          <a href="/firebase-messaging-sw.js">Download</a>
        </p>

        <p>
          integrate.js <a href="/integrate.js">Download</a>
        </p>
        <p>
          config.js <a href="/config.js">Download</a>
        </p>
      </div>
    </div>
  );
}

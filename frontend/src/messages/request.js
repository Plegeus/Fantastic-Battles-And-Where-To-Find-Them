
export async function send(url, object) {
  fetch(url, {
    "method": "POST",
    "headers": { 
      "content-type": "application/json" 
    },
    "body": JSON.stringify({
      data: object,
    }),
  });
}
export async function receive(url, callback) {
  fetch(url).then((res) => res.json()).then(
    (data) => {
      console.log(">>> Message received @ " + url + " <<<");
      callback(data);
    }
  );
}

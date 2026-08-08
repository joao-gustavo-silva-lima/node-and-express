(function () {
  const req = new Request("http://localhost:5000", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify("Hello Server!"),
  });

  fetch(req)
    .then((res) => res.json())
    .then((data) => console.log(data))
    .catch((error) => console.log(error));
})();

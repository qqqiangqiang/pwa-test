(function () {
  document.getElementById('test').innerText = 'hello, word！！！'
  fetch('/mock/data.json')
    .then(function (response) {
      return response.json();
    })
    .then(function (myJson) {
      // console.log(myJson);
    });

  var xhr = new XMLHttpRequest();
  xhr.open('GET', '/mock/data2.json', true);
  xhr.send();
})()
// function blurImage(imageURL) {
//   let image = document.createElement('img');
//   image.src = imageURL;
//   image.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 9999; filter: blur(20px);';
//   image.style.innerHTML = 'This image is inappropriate';
//   document.body.appendChild(image);
// }

// function init() {
//   chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//       if (request.action === 'blurImage') {
//           blurImage(request.imageURL);
//       }
//   });
// }

// init();
function blurImage(imageURL) {
  let image = document.createElement('img');
  image.src = imageURL;
  image.style.cssText = 'position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: 9999; filter: blur(10px);';
  document.body.appendChild(image);
}

function init() {
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'blurImage') {

      blurImage(request.imageURL);


    }
  });
}

init();

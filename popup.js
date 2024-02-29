

document.addEventListener('DOMContentLoaded', init);

function init() {
    document.getElementById('classifyButton').addEventListener('click', classifyImageOnClick);
}

function classifyImageOnClick() {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        let currentTab = tabs[0];
        let imageURL = currentTab.url;
        fetchPrediction(currentTab, imageURL); // Pass currentTab to fetchPrediction
    });
}

function fetchPrediction(currentTab, imageURL) { // Add currentTab as a parameter
    const endpoint = `https://abhi2502-kavalar-eye.hf.space/predict?src=${imageURL}`;
    fetch(endpoint)
        .then(handleResponse)
        .then(processImage.bind(null, currentTab, imageURL)) // Pass currentTab and imageURL to processImage
        .catch(handleError);
}

function handleResponse(response) {
    if (!response.ok) {
        throw new Error("Error in fetching");
    }
    return response.json();
}

function processImage(currentTab, imageURL, data) { // Add currentTab as a parameter
    let resultDiv = document.getElementById('result');
    let reportButton = document.getElementById('report');
    if (data.predicted_class === 'pornpics' || data.predicted_class === 'gore') {
        resultDiv.innerHTML = `<p>This image is inappropriate ${data.predicted_class}</p>`;
        blurImageOnTab(currentTab.id, imageURL); // Blur the image
        reportButton.style.display = 'block';

        reportButton.addEventListener('click', function() {
            fetch('http://localhost:3000/email', {
                method: 'GET'
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to send email');
                }
                return response.text();
            })
            .then(data => {
                console.log('Email sent successfully:', data);
                alert('Email sent successfully');
            })
            .catch(error => {
                console.error('Error sending email:', error);
                alert('Failed to send email');
            });
        });

    } else {
        resultDiv.innerHTML = `<p>This image is normal</p>`;
        console.log("ok i wont blur");
        //blurImageOnTab(currentTab.id, imageURL, false); // Do not blur the image
    }
}

function handleError(error) {
    console.log(error);
}

function blurImageOnTab(tabId, imageURL, shouldBlur) {
    chrome.tabs.sendMessage(tabId, { action: 'blurImage', imageURL: imageURL });
}



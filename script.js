const templates = [
    "templates/template1.png",
    "templates/template2.png",
    "templates/template3.png",
    "templates/template4.png",
    "templates/template5.png",
    "templates/template6.png",
    "templates/template7.png",
    "templates/template8.png",
    "templates/template9.png",
    "templates/template10.png"
];

function generateCard() {
    let greetingText = document.getElementById("greetingInput").value;
    let cardContainer = document.getElementById("cardContainer");

    if (!greetingText) {
        alert("Please enter a greeting!");
        return;
    }

    let randomTemplate = templates[Math.floor(Math.random() * templates.length)];

    cardContainer.innerHTML = `
        <div id="greetingCard" class="greetingCard">
            <img src="${randomTemplate}" alt="Greeting Card" class="cardImage" id="cardImage">
            <p class="greetingText" id="greetingText">${greetingText}</p>
        </div>
    `;

    let img = document.getElementById("cardImage");
    img.onload = function () {
        adjustTextColor(img);
        adjustFontSize(greetingText);
    };
}

function clearCard() {
    document.getElementById("greetingInput").value = "";
    document.getElementById("cardContainer").innerHTML = "";
}

function adjustTextColor(img) {
    let text = document.getElementById("greetingText");

    if (!img || !text) return;

    let canvas = document.createElement("canvas");
    let ctx = canvas.getContext("2d");

    canvas.width = img.width;
    canvas.height = img.height;
    ctx.drawImage(img, 0, 0, img.width, img.height);

    let pixelData = ctx.getImageData(img.width / 2, img.height / 2, 1, 1).data;
    let brightness = (pixelData[0] * 0.299 + pixelData[1] * 0.587 + pixelData[2] * 0.114);

    text.style.color = brightness > 128 ? "black" : "white";
}

// Auto-adjust font size
function adjustFontSize(text) {
    let textElement = document.getElementById("greetingText");
    
    if (text.length > 50) {
        textElement.style.fontSize = "14px";  // Smaller font for longer text
    } else if (text.length > 20) {
        textElement.style.fontSize = "18px";  // Medium font
    } else {
        textElement.style.fontSize = "24px";  // Large font for short text
    }

    textElement.style.fontFamily = "Arial, sans-serif"; // Set font style
    textElement.style.fontWeight = "bold";  // Make text bold
    textElement.style.textAlign = "center"; // Center text
}

// Share the greeting card
function shareCard() {
    let card = document.getElementById("greetingCard");

    if (!card) {
        alert("Please generate a card first!");
        return;
    }

    html2canvas(card).then(canvas => {
        canvas.toBlob(blob => {
            let file = new File([blob], "greeting_card.png", { type: "image/png" });
            let data = {
                files: [file]
            };

            if (navigator.canShare && navigator.canShare(data)) {
                navigator.share(data).catch(err => console.error("Share failed:", err));
            } else {
                alert("Sharing is not supported on this device.");
            }
        });
    });
}

const images = [
    "https://picsum.photos/id/237/200/300", 
    "https://picsum.photos/seed/picsum/200/300", 
    "https://picsum.photos/200/300?grayscale", 
    "https://picsum.photos/200/300/", 
    "https://picsum.photos/200/300.jpg"
];

let selectedImages = [];
let duplicateIndex = Math.floor(Math.random() * images.length);

// Add duplicate image
const shuffledImages = [...images, images[duplicateIndex]].sort(() => Math.random() - 0.5);

const container = document.getElementById('image-container');
const resetButton = document.getElementById('reset');
const verifyButton = document.getElementById('verify');
const message = document.getElementById('para');

function displayImages() {
    shuffledImages.forEach((src, index) => {
        const img = document.createElement('img');
        img.src = src;
        img.className = img${(index % 5) + 1}; // Assign class names .img1 to .img5
        img.dataset.index = index;
        img.addEventListener('click', () => selectImage(img));
        container.appendChild(img);
    });
}

function selectImage(img) {
    if (selectedImages.length < 2 && !selectedImages.includes(img)) {
        img.classList.add('selected');
        selectedImages.push(img);
        resetButton.style.display = 'block';

        if (selectedImages.length === 2) {
            verifyButton.style.display = 'block';
        }
    }
}

function resetSelection() {
    selectedImages.forEach(img => img.classList.remove('selected'));
    selectedImages = [];
    resetButton.style.display = 'none';
    verifyButton.style.display = 'none';
    message.textContent = "";
}

function verifySelection() {
    if (selectedImages.length === 2) {
        const [img1, img2] = selectedImages;
        if (img1.src === img2.src) {
            message.textContent = "You are a human. Congratulations!";
            message.style.color = "green";
        } else {
            message.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
            message.style.color = "red";
        }
        verifyButton.style.display = 'none';
    }
}


resetButton.addEventListener('click', resetSelection);
verifyButton.addEventListener('click', verifySelection);


displayImages();
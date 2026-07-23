let currentListing;

let currentImage = 0;

async function openListing(id){

    currentListing = await getListing(id);

    currentImage = 0;

    buildModal();

}

function buildModal(){

    const modal =
        document.getElementById("listingModal");

    const body =
        document.getElementById("modalBody");

    const amenities =
        currentListing["Amenities"]
        ?.split(",")
        .map(a=>`<div class="amenity">${a.trim()}</div>`)
        .join("") || "";

    const images = [];

    for(let i=1;i<=10;i++){

        if(currentListing["I-"+i]){

            images.push(currentListing["I-"+i]);

        }

    }

    body.innerHTML = `

<div class="modalContent">

<div class="gallery">

<button
class="gallery-arrow gallery-left"
onclick="previousImage()">

❮

</button>

<img
id="galleryImage"
src="${images[0]}">

<button
class="gallery-arrow gallery-right"
onclick="nextImage()">

❯

</button>

</div>

<div class="details">

<h1>

Luxury Apartment

</h1>

<div class="detail-price">

$${currentListing["Net Effective Rent"]}/month

</div>

<div class="detail-specs">

<div>

🛏 ${currentListing["Beds"]} Bed

</div>

<div>

🛁 ${currentListing["Baths"]} Bath

</div>

<div>

📏 ${currentListing["Squarefoot"]} SqFt

</div>

</div>

<div class="unlockNotice">

<h3>

🔒 Community Protected

</h3>

<p>

You're viewing an approximate location.

Schedule a tour with us to unlock the

community name,

exact address,

leasing office,

and directions.

</p>

</div>

<h3>

Amenities

</h3>

<div class="amenity-grid">

${amenities}

</div>

<button
class="unlockButton"
onclick="showUnlockForm()">

I'm Interested • Schedule Tour

</button>

</div>

</div>

`;

    modal.classList.add("show");

    window.currentImages = images;

}

function previousImage(){

    currentImage--;

    if(currentImage<0)

        currentImage=
        currentImages.length-1;

    document.getElementById("galleryImage").src =
    currentImages[currentImage];

}

function nextImage(){

    currentImage++;

    if(currentImage>=currentImages.length)

        currentImage=0;

    document.getElementById("galleryImage").src =
    currentImages[currentImage];

}

document
.getElementById("closeModal")
.onclick=()=>{

    document
    .getElementById("listingModal")
    .classList
    .remove("show");

};

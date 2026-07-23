/* ==========================================================
   LISTING CARDS
   ========================================================== */

const grid =
    document.getElementById("listingGrid");

/* ==========================================
   Render Listings
========================================== */

function renderListings(listings){

    grid.innerHTML = "";

    if(!listings.length){

        grid.innerHTML = `
            <div class="no-results">
                No apartments found.
            </div>
        `;

        return;
    }

    listings.forEach((listing,index)=>{

        const image =
            listing.images?.[0] ||
            "https://placehold.co/600x400";

        const imageCount =
            listing.images?.length || 0;

        /* ---------------------------
           Amenities
        ---------------------------- */

        let amenities = [];

        if(listing.amenities){

            amenities =
                listing.amenities
                .split(",")
                .slice(0,4);

        }

        const amenityHTML =
            amenities.map(item=>`

                <div class="amenity">
                    ${item.trim()}
                </div>

            `).join("");

        /* ---------------------------
           Generic Public Name
        ---------------------------- */

        const publicName =
            getPublicTitle(listing);

        /* ---------------------------
           Distance Placeholder
        ---------------------------- */

        const distanceText =
            listing.distanceText ||
            "Near your selected area";

        /* ---------------------------
           Card
        ---------------------------- */

        const card = document.createElement("div");

        card.className =
            "listing-card";

        card.innerHTML = `

            <div class="listing-image">

                <img
                    src="${image}"
                    loading="lazy"
                    alt="Apartment">

                <div class="image-overlay"></div>

                <div class="price-badge">

                    $${listing.price}/mo

                </div>

                <div class="image-count">

                    📷 ${imageCount}

                </div>

                <div class="favorite">

                    ♡

                </div>

            </div>

            <div class="listing-body">

                <div class="listing-title">

                    ${publicName}

                </div>

                <div class="listing-location">

                    ${distanceText}

                </div>

                <div class="listing-specs">

                    <div class="spec">
                        🛏 ${listing.beds} Bed
                    </div>

                    <div class="spec">
                        🛁 ${listing.baths} Bath
                    </div>

                    <div class="spec">
                        📏 ${listing.sqft} SqFt
                    </div>

                </div>

                <div class="amenities">

                    ${amenityHTML}

                </div>

                <button class="learn-more">

                    Learn More

                </button>

            </div>

        `;

        /* ---------------------------
           Open Listing
        ---------------------------- */

        card.addEventListener("click",()=>{

            openListing(listing.id);

        });

        grid.appendChild(card);

        /* ---------------------------
           Fade In
        ---------------------------- */

        setTimeout(()=>{

            card.classList.add("visible");

        },index * 60);

    });

}

/* ==========================================
   Public Titles
========================================== */

function getPublicTitle(listing){

    const beds =
        listing.beds || "";

    const baths =
        listing.baths || "";

    const names = [

        `Luxury ${beds} Bedroom Apartment`,

        `Modern ${beds} Bed / ${baths} Bath`,

        `Updated Apartment Home`,

        `${beds} Bedroom Near Popular Area`,

        `Pet Friendly Apartment`

    ];

    return names[
        Math.floor(
            Math.random() * names.length
        )
    ];

}

/* ==========================================
   Favorite
========================================== */

document.addEventListener("click",(e)=>{

    if(
        e.target.classList.contains("favorite")
    ){

        e.stopPropagation();

        e.target.classList.toggle("active");

    }

});

/* ==========================================
   Open Listing
========================================== */

async function openListing(id){

    console.log("Open:",id);

    // Modal comes next

}

/* ==========================================================
   API
   ========================================================== */

const API_URL =
"https://script.google.com/macros/s/AKfycbxP6mavWezKYPYiq-Han6SbNZj3FcY-RKU66mjjbLUfXkoyc0JPhUifITYE9qvFB4vM/exec";

let allListings = [];

/* ==========================================
   Load All Listings
========================================== */

async function getListings(){

    try{

        const response = await fetch(API_URL + "?action=list");

        if(!response.ok){

            throw new Error("Unable to load listings.");

        }

        const data = await response.json();

        allListings = data;

        return data;

    }

    catch(error){

        console.error(error);

        return [];

    }

}

/* ==========================================
   Load One Listing
========================================== */

async function getListing(id){

    try{

        const response =
        await fetch(API_URL + "?action=get&id=" + id);

        if(!response.ok){

            throw new Error("Unable to load listing.");

        }

        return await response.json();

    }

    catch(error){

        console.error(error);

        return null;

    }

}

/* ==========================================
   Search
========================================== */

function searchListings(text){

    text = text.toLowerCase();

    return allListings.filter(listing=>{

        const searchable = [

            listing.property,

            listing.address,

            listing.amenities,

            listing.price,

            listing.beds,

            listing.baths

        ].join(" ").toLowerCase();

        return searchable.includes(text);

    });

}

/* ==========================================
   Price Filter
========================================== */

function filterPrice(min,max){

    return allListings.filter(listing=>{

        const rent =
        Number(
            String(listing.price)
            .replace(/[^0-9]/g,"")
        );

        return rent>=min && rent<=max;

    });

}

/* ==========================================
   Bedroom Filter
========================================== */

function filterBeds(beds){

    return allListings.filter(listing=>{

        return Number(listing.beds)>=beds;

    });

}

/* ==========================================
   Amenities
========================================== */

function hasAmenity(listing,name){

    if(!listing.amenities)
        return false;

    return listing.amenities
        .toLowerCase()
        .includes(name.toLowerCase());

}

/* ==========================================
   Sort
========================================== */

function sortListings(method){

    switch(method){

        case "priceLow":

            allListings.sort((a,b)=>

                Number(a.price)-Number(b.price)

            );

            break;

        case "priceHigh":

            allListings.sort((a,b)=>

                Number(b.price)-Number(a.price)

            );

            break;

        case "beds":

            allListings.sort((a,b)=>

                Number(b.beds)-Number(a.beds)

            );

            break;

    }

    return allListings;

}

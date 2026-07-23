document.addEventListener(
    "DOMContentLoaded",
    async ()=>{

        const listings =
            await getListings();

        renderListings(listings);

    }
);

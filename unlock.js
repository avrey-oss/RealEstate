/* ==========================================================
   UNLOCK FORM
========================================================== */

function showUnlockForm() {

    const body = document.getElementById("modalBody");

    body.innerHTML = `

<div class="unlockContainer">

<h2>Unlock Community Information</h2>

<p>

Complete your apartment search preferences to
receive the exact community name, tour scheduling,
and personalized recommendations.

</p>

<form
id="unlockForm"
action="/agent/avrey-anderson"
method="POST">

<!-- Hidden fields copied exactly -->

<input type="hidden" name="agentHelp" value="57c1d9540349c6d49bef153580e2ec8c">
<input type="hidden" name="smProFormId" value="1784422194">
<input type="hidden" name="agent_name" value="avrey-anderson">
<input type="hidden" name="lease" value="7">
<input type="hidden" name="form_office" value="6">
<input type="hidden" name="texas" value="2">
<input type="hidden" name="dnipro" id="dinero">
<input type="hidden" name="octane" value="6a5c1f32c4d87">
<input type="hidden" name="propane" value="4_agent">
<input type="hidden" name="vip" value="0">

<div class="formGrid">

<input
name="form_firstname"
placeholder="First Name"
required
autocomplete="given-name">

<input
name="form_lastName"
placeholder="Last Name"
required
autocomplete="family-name">

<input
name="form_phoneNumber"
placeholder="Phone"
required
autocomplete="tel">

<input
name="form_email"
placeholder="Email"
required
autocomplete="email">

<input
name="form_location"
placeholder="Desired Area"
value="${currentListing.Address || ""}">

<input
type="date"
name="form_moveIn">

<select name="form_beds">

<option></option>

<option>1</option>
<option>2</option>
<option>3</option>
<option>4+</option>

</select>

<select name="form_baths">

<option></option>

<option>1</option>
<option>2</option>
<option>3</option>
<option>4+</option>

</select>

<input
type="number"
name="form_price"
placeholder="Maximum Budget">

<!-- NEW WEBSITE ONLY -->

<label>

Preferred Tour Date

</label>

<input
id="tourDate"
type="date">

<label>

Preferred Tour Time

</label>

<input
id="tourTime"
type="time">

<textarea
name="form_details"
id="form_details"
style="display:none;"></textarea>

<button type="submit">

Unlock Listing

</button>

</div>

</form>

</div>

`;

    document
        .getElementById("unlockForm")
        .addEventListener("submit", buildNotes);

}

function buildNotes(e){

    const notes=[];

    notes.push("===== WEBSITE LISTING LEAD =====");

    notes.push("");

    notes.push("Lead Source:");

    notes.push("Apartment Listing Website");

    notes.push("");

    notes.push("Listing ID:");

    notes.push(currentListing["Listing ID:"]);

    notes.push("");

    notes.push("Displayed Area:");

    notes.push(currentListing["Address"]);

    notes.push("");

    notes.push("Price:");

    notes.push(currentListing["Net Effective Rent"]);

    notes.push("");

    notes.push("Bedrooms:");

    notes.push(currentListing["Beds"]);

    notes.push("");

    notes.push("Bathrooms:");

    notes.push(currentListing["Baths"]);

    notes.push("");

    notes.push("Square Feet:");

    notes.push(currentListing["Squarefoot"]);

    notes.push("");

    notes.push("Amenities:");

    notes.push(currentListing["Amenities"]);

    notes.push("");

    notes.push("Requested Tour Date:");

    notes.push(document.getElementById("tourDate").value);

    notes.push("");

    notes.push("Requested Tour Time:");

    notes.push(document.getElementById("tourTime").value);

    notes.push("");

    notes.push("Website:");

    notes.push(window.location.href);

    document
        .getElementById("form_details")
        .value =
        notes.join("\n");

}

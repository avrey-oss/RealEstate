/* ==========================================================
   unlock.js
   Apartment Listing Unlock Wizard
========================================================== */

let currentStep = 1;

/* ==========================================
   Open Unlock Form
========================================== */

function showUnlockForm() {

    const body = document.getElementById("modalBody");

    body.innerHTML = `

<div class="unlockContainer">

<div class="wizardHeader">

<h2>Unlock This Listing</h2>

<p>

Complete a few quick questions to unlock the
community name, exact location and schedule
a personalized apartment tour.

</p>

<div class="wizardProgress">

<div class="wizardBar">

<div
id="wizardProgressFill"
class="wizardProgressFill"></div>

</div>

<div class="wizardSteps">

<span id="wizardLabel1">Contact</span>

<span id="wizardLabel2">Apartment</span>

<span id="wizardLabel3">Tour</span>

</div>

</div>

</div>

<form
id="unlockForm"
action="/agent/avrey-anderson"
method="POST">

<!-- ===================================================
     Hidden CRM Fields
=================================================== -->

<input type="hidden" name="agentHelp" value="57c1d9540349c6d49bef153580e2ec8c">

<input type="hidden" name="smProFormId" value="1784422194">

<input type="hidden" name="agent_name" value="avrey-anderson">

<input type="hidden" name="lease" value="7">

<input type="hidden" name="form_office" value="6">

<input type="hidden" name="texas" value="2">

<input type="hidden" name="dnipro" id="dinero">

<input type="hidden" name="octane"
value="6a5c1f32c4d87">

<input type="hidden" name="propane"
value="4_agent">

<input type="hidden" name="vip"
value="0">

<div class="formGrid">

<!-- ===================================================
     STEP ONE
=================================================== -->

<div
class="wizard-step active"
id="step1">

<h3>

Step 1 of 3

</h3>

<h2>

Where should I send the details?

</h2>

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

placeholder="Phone Number"

required

autocomplete="tel">

<input

name="form_email"

placeholder="Email"

required

autocomplete="email">

<div class="wizardButtons">

<button

type="button"

class="primary"

onclick="nextStep()">

Continue →

</button>

</div>

</div>

<!-- ===================================================
     STEP TWO
=================================================== -->

<div
class="wizard-step"
id="step2">

<h3>

Step 2 of 3

</h3>

<h2>

Tell me about your apartment search.

</h2>

<input

name="form_location"

placeholder="Desired Area"

value="${currentListing.Address || ""}">

<label>

Move In Date

</label>

<input

type="date"

name="form_moveIn">

<label>

Bedrooms

</label>

<select

name="form_beds">

<option></option>

<option>1</option>

<option>2</option>

<option>3</option>

<option>4+</option>

</select>

<label>

Bathrooms

</label>

<select

name="form_baths">

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

<input

name="form_reason"

placeholder="Reason For Moving">

<div class="wizardButtons">

<button

type="button"

onclick="previousStep()">

← Back

</button>

<button

type="button"

class="primary"

onclick="nextStep()">

Continue →

</button>

</div>

</div>

<!-- ===================================================
     STEP THREE
=================================================== -->

<div

class="wizard-step"

id="step3">

<h3>

Step 3 of 3

</h3>

<h2>

Almost finished!

</h2>

<label>

Credit

</label>

<select

name="form_credit">

<option value="">N/A</option>

<option value="1">Unknown</option>

<option value="2">Poor (300-579)</option>

<option value="3">Fair (580-669)</option>

<option value="4">Good (670-739)</option>

<option value="6">Very Good (740-799)</option>

<option value="5">Exceptional (800-850)</option>

</select>

<label>

Pets?

</label>

<div class="radioGroup">

<label>

<input
type="radio"
name="form_pets"
value="1">

Yes

</label>

<label>

<input
type="radio"
name="form_pets"
value="0">

No

</label>

</div>

<label>

Student?

</label>

<div class="radioGroup">

<label>

<input
type="radio"
name="form_student"
value="1">

Yes

</label>

<label>

<input
type="radio"
name="form_student"
value="0">

No

</label>

</div>

<label>

Criminal History?

</label>

<div class="radioGroup">

<label>

<input
type="radio"
name="form_record"
value="1">

Yes

</label>

<label>

<input
type="radio"
name="form_record"
value="0">

No

</label>

</div>

<label>

Interested in Purchasing a Home?

</label>

<div class="radioGroup">

<label>

<input
type="radio"
name="form_future"
value="1">

Yes

</label>

<label>

<input
type="radio"
name="form_future"
value="0">

No

</label>

</div>

<label>

How did you hear about Apartment Pros?

</label>

<select
name="form_hear">

<option value="">N/A</option>

<option value="1">Google</option>

<option value="2">Yelp</option>

<option value="3">Instagram</option>

<option value="4">Facebook</option>

<option value="5">Referral From A Friend</option>

<option value="6">Referral From Other</option>

<option value="7">Repeat Client</option>

<option value="8">Office Signage</option>

<option value="9">Other</option>

</select>

<hr>

<h3>

Preferred Tour

</h3>

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

style="display:none;">

</textarea>

<div class="wizardButtons">

<button

type="button"

onclick="previousStep()">

← Back

</button>

<button

type="submit"

class="primary">

Unlock Listing

</button>

</div>

</div>

</div>

</form>

</div>

`;

    document
        .getElementById("unlockForm")
        .addEventListener("submit", buildNotes);

    restoreVisitor();

    showStep(1);

}

/* ==========================================
   Wizard Navigation
========================================== */


function showStep(step){

    document
        .querySelectorAll(".wizard-step")
        .forEach(div=>{

            div.style.display="none";

        });

    document
        .getElementById("step"+step)
        .style.display="block";

    currentStep = step;

    updateProgress();

}

function nextStep(){

    if(currentStep<3){

        showStep(currentStep+1);

    }

}

function previousStep(){

    if(currentStep>1){

        showStep(currentStep-1);

    }

}

function updateProgress(){

    const fill =
    document.getElementById("wizardProgressFill");

    if(!fill) return;

    if(currentStep===1)
        fill.style.width="33%";

    if(currentStep===2)
        fill.style.width="66%";

    if(currentStep===3)
        fill.style.width="100%";

}

/* ==========================================
   Restore Returning Visitor
========================================== */

function restoreVisitor(){

    const visitor =
    JSON.parse(
        localStorage.getItem("ApartmentLead")
    );

    if(!visitor)
        return;

    if(document.querySelector('[name=form_firstname]'))
        document.querySelector('[name=form_firstname]').value =
        visitor.firstName || "";

    if(document.querySelector('[name=form_lastName]'))
        document.querySelector('[name=form_lastName]').value =
        visitor.lastName || "";

    if(document.querySelector('[name=form_phoneNumber]'))
        document.querySelector('[name=form_phoneNumber]').value =
        visitor.phone || "";

    if(document.querySelector('[name=form_email]'))
        document.querySelector('[name=form_email]').value =
        visitor.email || "";

}

/* ==========================================
   Build CRM Notes
========================================== */

function buildNotes(){

    const notes=[];

    notes.push("===== WEBSITE LEAD =====");
    notes.push("");

    notes.push("Lead Source:");
    notes.push("Apartment Listing Website");
    notes.push("");

    notes.push("Listing ID:");
    notes.push(currentListing["Listing ID:"] || "");
    notes.push("");

    notes.push("Displayed Area:");
    notes.push(currentListing["Address"] || "");
    notes.push("");

    notes.push("Displayed Rent:");
    notes.push(currentListing["Net Effective Rent"] || "");
    notes.push("");

    notes.push("Bedrooms:");
    notes.push(currentListing["Beds"] || "");
    notes.push("");

    notes.push("Bathrooms:");
    notes.push(currentListing["Baths"] || "");
    notes.push("");

    notes.push("Square Feet:");
    notes.push(currentListing["Squarefoot"] || "");
    notes.push("");

    notes.push("Amenities:");
    notes.push(currentListing["Amenities"] || "");
    notes.push("");

    notes.push("Requested Tour Date:");
    notes.push(document.getElementById("tourDate").value);
    notes.push("");

    notes.push("Requested Tour Time:");
    notes.push(document.getElementById("tourTime").value);
    notes.push("");

    notes.push("Website:");
    notes.push(window.location.href);
    notes.push("");

    notes.push("Timestamp:");
    notes.push(new Date().toLocaleString());

    document
        .getElementById("form_details")
        .value =
        notes.join("\n");

    const visitor={

        firstName:
        document.querySelector('[name=form_firstname]').value,

        lastName:
        document.querySelector('[name=form_lastName]').value,

        phone:
        document.querySelector('[name=form_phoneNumber]').value,

        email:
        document.querySelector('[name=form_email]').value

    };

    localStorage.setItem(
        "ApartmentLead",
        JSON.stringify(visitor)
    );

    localStorage.setItem(
        "ApartmentLeadUnlocked",
        "true"
    );

    return true;

}

console.log("unlock.js loaded");

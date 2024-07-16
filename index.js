const BASE_URL =
    "https://api.currencyapi.com/v3/latest?apikey=cur_live_OGH7IQNePbPkMSD93hUUN7gvHhyyn0UUKH1Pww55";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.classList.contains("from") && currCode === "USD") {
            newOption.selected = true;
        } else if (select.classList.contains("to") && currCode === "INR") {
            newOption.selected = true;
        }
        select.append(newOption);
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}

const updateExchangeRate = async () => {
    let amount = document.querySelector(".amount input");
    let amtVal = amount.value;
    if (amtVal === "" || amtVal < 1) {
        amtVal = 1;
        amount.value = 1;
    }

    const URL = `${BASE_URL}`;
    try {
        let response = await fetch(URL);
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }
        let data = await response.json();
        
        if (data.data[fromCurr.value] && data.data[toCurr.value]) {
            let rate = data.data[toCurr.value].value / data.data[fromCurr.value].value;
            let finalAmount = amtVal * rate;
            msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount.toFixed(2)} ${toCurr.value}`;
        } else {
            throw new Error("Exchange rate not found.");
        }
    } catch (error) {
        console.error("Error:", error);
        msg.innerText = "Failed to fetch conversion rate. Please try again.";
    }
};


const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    if (img) {
        img.src = newSrc;
    }
};

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

document.querySelectorAll(".dropdown select").forEach(select => updateFlag(select));

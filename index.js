const BASE_URL =
    "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");

for (let select of dropdowns) {
    for (currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = true;
        }

        else if (select.name === "to" && currCode === "USD") {
            newOption.selected = true;
        }
        select.append(newOption)
    }

    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    })
}

const updateFlag = (elem) => {
    let countryCode = countryList[elem.value];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = elem.parentElement.querySelector("img");
    img.src = newSrc;
}

let btn = document.querySelector(".btn");
btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amt = document.querySelector("form input");
    if (amt.value === "" || amt.value < 1) {
        amt.value = 1;
    }

    const fromCurr = document.querySelector(".from select");
    const toCurr = document.querySelector(".to select ")

    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    console.log(response)
    let data = await (response.json());
    let rate = data[toCurr.value.toLowerCase()];

    let finalAmt = amt*rate;

    const msg = document.querySelector(".msg");
    msg.innerText = `${amt} ${fromCurr} =  ${finalAmt}  ${toCurr}`
})



const API_URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

let coinData = [];

const tableBody = document.getElementById("tableBody");
const searchInput = document.getElementById("searchInput");
const sortMarketCap = document.getElementById("sortMarketCap");
const sortPercentage = document.getElementById("sortPercentage");


// ---------------- FETCH USING .THEN() ----------------

function fetchUsingThen() {
    fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
            coinData = data;
            renderTable(coinData);
        })
        .catch((error) => {
            console.log(error);
        });
}


// ---------------- FETCH USING ASYNC/AWAIT ----------------

async function fetchUsingAsync() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        coinData = data;
        renderTable(coinData);
    } catch (error) {
        console.log(error);
    }
}


// ---------------- RENDER TABLE ----------------

function renderTable(data) {

    tableBody.innerHTML = "";

    data.forEach((coin) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td style="width:25%;">
                <div class="coin-info">
                    <img src="${coin.image}" alt="${coin.name}">
                    <span>${coin.name}</span>
                </div>
            </td>

            <td style="width:10%;">
                ${coin.symbol.toUpperCase()}
            </td>

            <td style="width:12%;">
                ${coin.current_price}
            </td>

            <td style="width:20%;">
                ${coin.total_volume}
            </td>

            <td class="${
                coin.price_change_percentage_24h >= 0
                    ? "green"
                    : "red"
            }" style="width:12%;">
                ${coin.price_change_percentage_24h.toFixed(2)}%
            </td>

            <td style="width:21%;">
                Mkr Cap: ${coin.market_cap}
            </td>
        `;

        tableBody.appendChild(row);
    });
}


// ---------------- SEARCH WHILE TYPING ----------------

searchInput.addEventListener("input", () => {

    const searchText = searchInput.value.toLowerCase().trim();

    const filteredCoins = coinData.filter((coin) => {
        return (
            coin.name.toLowerCase().includes(searchText) ||
            coin.symbol.toLowerCase().includes(searchText)
        );
    });

    renderTable(filteredCoins);
});


// ---------------- SORT BY MARKET CAP ----------------

sortMarketCap.addEventListener("click", () => {

    const sortedData = [...coinData].sort(
        (a, b) => b.market_cap - a.market_cap
    );

    renderTable(sortedData);
});


// ---------------- SORT BY PERCENTAGE CHANGE ----------------

sortPercentage.addEventListener("click", () => {

    const sortedData = [...coinData].sort(
        (a, b) =>
            b.price_change_percentage_24h -
            a.price_change_percentage_24h
    );

    renderTable(sortedData);
});


// ---------------- INITIAL FETCH ----------------

// Using .then()
fetchUsingThen();

// If your evaluator specifically wants async/await,
// comment the above line and uncomment the line below.

// fetchUsingAsync();
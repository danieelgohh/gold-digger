const priceDisplay = document.getElementById("price-display")
const amountForm = document.getElementById("amount-form")

const eventSource = new EventSource("/api/price")

eventSource.onmessage = (e) => {
  const data = JSON.parse(e.data)
  const price = data.price

  priceDisplay.textContent = price
}

eventSource.onerror = () => {
  console.log("There was an error fetching the prices")
}
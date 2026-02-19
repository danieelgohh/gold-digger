const priceDisplay = document.getElementById("price-display")
const amountForm = document.getElementById("amount-form")
const dialogText = document.getElementById("investment-summary")
const dialog = document.getElementsByTagName("dialog")[0]
const dismissDialogBtn = dialog.children[2]

// Format the date to a readable string
const options = {
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
}

const eventSource = new EventSource("/api/price")

eventSource.onmessage = (e) => {
  const data = JSON.parse(e.data)
  const price = data.price

  priceDisplay.textContent = price
}

eventSource.onerror = () => {
  console.error("There was an error fetching the prices")
}

amountForm.addEventListener("submit", async (e) => {
  e.preventDefault()
  const formData = new FormData(amountForm)
  const transactionDetails = {
    date: new Date().toLocaleString("en-GB", options),
    ppoz: parseFloat(priceDisplay.textContent),
    amount: parseInt(formData.get("investment-amount")),
  }

  try {
    const response = await fetch("./api/price", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(transactionDetails),
    })
    if (response.ok) {
      dialogText.textContent = `You just bought ${(transactionDetails.amount  / transactionDetails.ppoz).toFixed(4)} for £${transactionDetails.amount}. \n You will receive documentation shortly.`
      dialog.showModal()
    }
  } catch (err) {
    dialogText.textContent = "There was an error completing your transaction. Please try again!"
    console.error("Error:", err)
  }
})

dismissDialogBtn.addEventListener("click", () => {
  dialog.close()
})
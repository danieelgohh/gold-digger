import fs from 'node:fs/promises'

export const logTransaction = async (date, amount, ppoz) => {
  const amountSold = parseFloat((amount / ppoz).toFixed(4))
  const logEntry = `Date: ${date}, Amount paid: ${amount}, Price per Oz: ${ppoz}, Sold: ${amountSold}\n`
  try {
    await fs.appendFile("transactions.txt", logEntry, "utf8")
  } catch (err) {
    console.error("There was an error appending to file:", err)
  }
}
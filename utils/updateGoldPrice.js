let currentPrice = 2650.00

export const getMockGoldPrice = () => {
  const volatility = 0.001

  const changePercent = (Math.random() * 2 - 1) * volatility

  const newPrice = currentPrice * (1 + changePercent)

  return parseFloat(newPrice.toFixed(2))
}
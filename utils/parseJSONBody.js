export const parseJSONBody = async (req) => {
  console.log(req)
  let body = ''

  for await (const chunk of req) {
    body += chunk
  }

  try {
    console.log(JSON.parse(body))
    return JSON.parse(body)
  } catch (err) {
    throw new Error(`Invalid JSON format: ${err}`)
  }
}
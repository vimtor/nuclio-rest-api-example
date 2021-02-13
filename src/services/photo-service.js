import fetch from "node-fetch"

const generatePhotoUrl = async ({ keywords, width = 1600, height = 800 }) => {
  const response = await fetch(`https://source.unsplash.com/${width}x${height}/?${keywords}`)
  return response.url
}

export default {
  generatePhotoUrl,
}

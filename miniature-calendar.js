// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: calendar-alt;
const LOCALE = "en-US"
const intOpts = { minimumIntegerDigits: 2, useGrouping: false }
  
let w = new ListWidget()

const initialImageUrl = getImageUrl();
let image = await getImage(initialImageUrl);

if(image === null) {
  const imageUrl = getImageUrl({tryMultiple: true});
  image = await getImage(imageUrl);
}

w.backgroundImage = image

await w.presentSmall()

Script.setWidget(w);
Script.complete();

function getImageUrl(opts) {
  const { tryMultiple } = opts || {}
  let today = new Date()
  let year = today.getFullYear()
  let month = (today.getMonth() + 1).toLocaleString(LOCALE, intOpts)
  let day = today.getDate().toLocaleString(LOCALE, intOpts)
  let dayName = new Intl.DateTimeFormat(LOCALE, { weekday: 'short' }).format(today).toLowerCase()
  let size = 768
  let query = `${year}/${month}/${year.toString().slice(2, 4)}${month}${day}${dayName + (tryMultiple ? "1" : "")}-${size}x${size}.jpg`
  
  // example image url: https://miniature-calendar.com/wp-content/uploads/2020/10/201018sun-768x768.jpg
  let url = `https://miniature-calendar.com/wp-content/uploads/${query}`
  return url
}

async function getImage(url) {
  let imageReq = new Request(url)
  let image = await imageReq.loadImage().catch(() => null)
  return image
}
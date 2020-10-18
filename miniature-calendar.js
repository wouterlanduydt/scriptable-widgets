// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: blue; icon-glyph: calendar-alt;

let w = new ListWidget()

// https://miniature-calendar.com/wp-content/uploads/2020/10/201018sun-768x768.jpg

let today = new Date()

const LOCALE = "en-US"

let year = today.getFullYear()
let month = (today.getMonth() + 1).toLocaleString(LOCALE, { minimumIntegerDigits: 2, useGrouping: false })
let day = today.getDate().toLocaleString(LOCALE, { minimumIntegerDigits: 2, useGrouping: false })
let dayName = new Intl.DateTimeFormat(LOCALE, { weekday: 'short' }).format(today).toLowerCase()
let dimension = 768
let query = `${year}/${month}/${year.toString().slice(2, 4)}${month}${day}${dayName}-${768}x${768}.jpg`

let url = `https://miniature-calendar.com/wp-content/uploads/${query}`
console.log(url)

let imageReq = new Request(url)
let image = await imageReq.loadImage()
w.backgroundImage = image

await w.presentSmall()

Script.setWidget(w);
Script.complete();

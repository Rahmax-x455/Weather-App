/* Global Variables */
const API_URL = "https://api.openweathermap.org/data/2.5/weather?"
const API_KEY = "c39428c59dce92ce9245eb4ceba63123"
let btn = document.getElementById("generate")
let userFeeling = document.getElementById("feelings")
let tempDiv = document.getElementById("temp")
let dateDiv = document.getElementById("date")
let contentDiv = document.getElementById("content")
let zipCode = document.getElementById("zip")

// Create a new date instance dynamically with JS
let d = new Date()
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear()

// Event listener to add function to existing HTML DOM element
btn.addEventListener("click", requestData)

/* Function called by event listener */
function requestData() {
  if (zipCode.value !== "") {
    getWeatherData(API_URL, zipCode.value, API_KEY)
      .then(data => {
        storeWeatherData("http://127.0.0.1:3000/data", { temp: data.main.temp, date: newDate, resp: userFeeling.value })
      })
      .then(() => getFromServerAndUpdateUI("http://127.0.0.1:3000/data"))
      .catch(error => alert(error))
  } else {
    alert("Enter the correct postal code!!")
  }
}

/* Function to GET Web API Data*/
async function getWeatherData(baseUrl = "", userZipCode = "", appid = "") {
  let response = await fetch(`${baseUrl}zip=${userZipCode}&appid=${appid}`)
  try {
    let data = await response.json()
    console.log(data)
    return data
  } catch (error) {
    console.log(error)
  }
}

/* Function to POST data */
async function storeWeatherData(url = "", data = {}) {
  let response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      temp: data.temp,
      date: data.date,
      resp: data.resp,
    }),
  })

  try {
    console.log("finished post request")
  } catch (error) {
    console.log(error)
  }
}

/* Function to GET Project Data */
async function getFromServerAndUpdateUI(url = "") {
  let response = await fetch(url, {
    method: "GET",
    credentials: "same-origin",
    headers: {
      "content-type": "application/json",
    },
  })
  try {
    let data = await response.json()
    console.log(data)
    tempDiv.innerHTML = "temp: " + Math.round(data.temp) + " degrees"
    dateDiv.innerHTML = "date: " + data.date
    contentDiv.innerHTML = "content: " + data.response
  } catch (error) {
    console.log(error)
  }
}

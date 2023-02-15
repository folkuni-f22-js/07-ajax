// <button id="ajax-button"> Send request </button>
// <p id="ajax-response"> Response here </p>

// Hämta element ur DOM
const ajaxButton = document.querySelector('#ajax-button')
const ajaxPara = document.querySelector('#ajax-response')
const exercise1 = {
	btn: document.querySelector('#btn-exercise1'),
	output: document.querySelector('#exercise1-output'),
	list: document.querySelector('#exercise1-advice-list')
}
const safe = {
	btn: document.querySelector('#safe-button'),
	output: document.querySelector('#safe-output')
}
	// < button id = "safe-button" > Skicka request </button>
	// 	<p id="safe-output"></

// Variabler och state
const baseUrl = 'https://forverkliga.se/JavaScript/api/simple.php'


// Event listeners
ajaxButton.addEventListener('click', async () => {
	// performance.now() används för att mäta hur lång tid det tar att skicka request och vänta på svaret.
	const startTime = performance.now()
	// Använd console.log för felsökning när det behövs
	// console.log('Ajax button click 1')
	
	// Ett vanligt request som skickas med fetch behöver inga inställningar. Man kan utelämna options: await fetch(baseUrl)
	const options = {}
	let response = await fetch(baseUrl, options)
	// console.log('Ajax button click 2', response)

	let data = await response.json()
	// console.log('Ajax button click 3', data)

	// Räkna ut hur lång tid det tog att köra funktionen
	let endTime = performance.now()
	let diff = endTime - startTime

	// Presentera datan för användaren
	ajaxPara.innerHTML = `${data.message} <br/> The request took ${diff} ms to execute.`
})


/*
1a Gör en webbapp som använder AJAX för att leverera "fortune cookies". Appen ska skicka ett GET request med fetch när man klickar på en button på sidan. Responsen ska du skriva ut med console.log.
Skicka till: https://api.adviceslip.com/advice 
API:et förväntas svara med ett objekt: { slip: { slip_id, advice } }

1c Gör så att tidigare tips sparas i en lista. Man ska kunna se deras id och själva texten.
*/
exercise1.btn.addEventListener('click', async () => {
	const url = 'https://api.adviceslip.com/advice'

	const response = await fetch(url)
	const data = await response.json()  // inte samma som JSON

	// const advice = data.slip.advice
	// const id = data.slip.id
	const { advice, id } = data.slip
	console.log('Data from advice API: ', data)
	console.log('Advice: ', advice)
	
	exercise1.output.innerText = advice

	let idSpan = document.createElement('span')
	let adviceSpan = document.createElement('span')
	idSpan.innerText = id
	adviceSpan.innerText = advice
	let li = document.createElement('li')
	li.append(idSpan)
	li.append(adviceSpan)
	exercise1.list.append(li)
})


safe.btn.addEventListener('click', async () => {
	try {
		// Försök att göra något, som inte är garanterat att det lyckas
		// Detta API förväntar sig querystring "key=value"
		const response = await fetch('https://forverkliga.se/JavaScript/api/simple.php?key=value')

		const data = await response.json()
		// await response.text() - om man bara vill ha innehållet som text

		console.log('Safe | data=', data)
		if( data && data.message && data.time ) {
			safe.output.innerText = `Meddelande: ${data.message}. Tid: ${data.time}.`
		} else {
			safe.output.innerText = 'Ingen massage från servern, tyvärr. Försök igen senare.'
		}

	} catch(error) {
		safe.output.innerText = `Det gick inte att skicka request! Försök igen senare. Felmeddelande: ` + error.message
	}
	// Vad kan vi göra om något går fel?
	// Be användaren kontrollera om man är uppkopplad
	// Be användaren försöka igen om en stund - kanske bäst
	// Meddelande: "Failed to load" - korrekt, men hjälper inte användaren. Undvik!
})
/*
JSON är ett objekt { parse, stringify } som används för att
JSON.parse <- omvandla en sträng till JS-objekt
JSON.stringify <- omvandla ett objekt till string
response.json() är en metod som ingår i Response-objektet. Används eftersom vi inte har fått hela strängen från servern än.
*/




// När man hovrar över fetch med musen säger VS Code:
// function fetch(input: RequestInfo | URL, init?: RequestInit | undefined): Promise<Response>
// :Promise<Response> betyder att funktionen returnerar ett PROMISE, som innehåller Response
// Ett Promise kommer så småningom att sluta med "resolve" eller "reject"
// Få ut Response ur Promise genom att vänta med AWAIT

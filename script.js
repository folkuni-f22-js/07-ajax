// <button id="ajax-button"> Send request </button>
// <p id="ajax-response"> Response here </p>

// Hämta element ur DOM
const ajaxButton = document.querySelector('#ajax-button')
const ajaxPara = document.querySelector('#ajax-response')

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


// När man hovrar över fetch med musen säger VS Code:
// function fetch(input: RequestInfo | URL, init?: RequestInit | undefined): Promise<Response>
// :Promise<Response> betyder att funktionen returnerar ett PROMISE, som innehåller Response
// Ett Promise kommer så småningom att sluta med "resolve" eller "reject"
// Få ut Response ur Promise genom att vänta med AWAIT

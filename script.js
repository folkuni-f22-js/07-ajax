// <button id="ajax-button"> Send request </button>
// <p id="ajax-response"> Response here </p>

// Hämta element ur DOM
const ajaxButton = document.querySelector('#ajax-button')
const ajaxPara = document.querySelector('#ajax-response')

// Variables and state
const baseUrl = 'https://forverkliga.se/JavaScript/api/simple.php'


// Event listeners
ajaxButton.addEventListener('click', async () => {
	const startTime = performance.now()
	console.log('Ajax button click 1')
	
	const options = {}
	let response = await fetch(baseUrl, options)
	console.log('Ajax button click 2', response)

	
	let data = await response.json()
	console.log('Ajax button click 3', data)
	
	// ajaxPara.innerText = JSON.stringify(data)
	// ajaxPara.innerText = data.message
	// ajaxPara.innerText = 'hejsan'

	let endTime = performance.now()
	let diff = endTime - startTime

	ajaxPara.innerHTML = `${data.message} <br/> The request took ${diff} ms to execute.`
})


// När man hovrar över fetch med musen säger VS Code:
// function fetch(input: RequestInfo | URL, init?: RequestInit | undefined): Promise<Response>
// :Promise<Response> betyder att funktionen returnerar ett PROMISE

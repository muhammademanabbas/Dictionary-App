document.querySelector('.search-btn').addEventListener('click', (e) => {
    e.preventDefault()
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${document.querySelector('#search').value}`)
    .then(response => response.json())
    .then(data => {
        document.querySelector('#result').innerText = data[0].meanings[0].definitions[0].definition
    })
})
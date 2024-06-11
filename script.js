let definition = document.querySelector("#result");
let searchWord = document.querySelector("#search");
let searchBtn = document.querySelector(".search-btn");
let AllSearches = document.querySelector("#searches");
let deleteAllSearchesBtn = document.querySelector(".ri-delete-bin-6-line");
let searchedWord ;

displaySearchHistory()

function getSeacrhResult() {
    searchBtn.addEventListener("click", (e) => {
        // Use keyup event for live updates
        e.preventDefault();
        const searchTerm = searchWord.value.trim(); // Trim leading/trailing spaces

        if (searchTerm) {
            fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchTerm}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.length) {
                        const definitionText =
                            data[0].meanings[0].definitions[0].definition;
                        definition.innerText = definitionText;
                        definition.style.textDecoration = "underline";
                        let prevLocalData = JSON.parse(localStorage.getItem('searchHistory')) || [];
                        prevLocalData.push(searchWord.value);
                        localStorage.setItem('searchHistory', JSON.stringify(prevLocalData));
                        displaySearchHistory();

                    } else {
                        definition.innerText = "No definition found.";
                        definition.style.textDecoration = "underline";
                    }
                })
                .catch((error) => {
                    // Handle network or API errors
                    console.error("Error fetching definition:", error);
                    definition.innerText = "An error occurred. Please try again later.";
                });
        } else {
            window.alert("Please Enter a Word to Search");
        }
    });
}
getSeacrhResult();

function searchHistoryTab() {
    document.querySelector(".search-history").addEventListener("click", (e) => {
        document.querySelector(".check-search-history").style.transform =
            "translateX(0%)";
    });
    document
        .querySelector(".ri-close-large-line")
        .addEventListener("click", (e) => {
            document.querySelector(".check-search-history").style.transform =
                "translateX(100%)";
        });
        document.querySelector('#landing-page').addEventListener("click", (e) => {
            document.querySelector(".check-search-history").style.transform =
                "translateX(100%)";
        });
}
searchHistoryTab();

function displaySearchHistory() {
    let localStorageData = JSON.parse(localStorage.getItem('searchHistory')) || [];
    if(localStorageData.length === 0){
        AllSearches.innerHTML = `<p class="no-search">No Search History</p>`;
        return ;
    }
    let historyWords = `` ; 
     for(let i = 0 ;   i<localStorageData.length ; i ++){
        historyWords+= `<div>
          <p class="searched">${localStorageData[i]}</p>
        </div>`
        // <p class="clear-one-search">Clear</p>
     }
     //console.log(historyWords);
    AllSearches.innerHTML  =  historyWords ;
}

function deleteAllSearchHistory(){
    deleteAllSearchesBtn.addEventListener("click", (e) => {
        // localStorage.clear();
        for (let i = 0; i < localStorage.length; i++) {
            const key = localStorage.key(i);
            localStorage.removeItem(key);
          }

        displaySearchHistory();
    });
    
}
deleteAllSearchHistory()

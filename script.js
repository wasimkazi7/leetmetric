document.addEventListener("DOMContentLoaded", function() {


    const searchButton = document.getElementById("search-btn");
    const usernameInput = document.getElementById("user-input");
    const statsContainer = document.querySelector(".stats-container");
    const easyLabel = document.getElementById("easy-label");
    const mediumLabel = document.getElementById("medium-label");
    const hardLabel = document.getElementById("hard-label");
    

    //return true or false based on a regex
    function validateUsername(username) {
        if(username.trim() === "") {
            alert("Username should not be empty");
            return false;
        }
        const regex = /^[a-zA-Z0-9_-]{1,15}$/;
        const isMatching = regex.test(username);
        if(!isMatching) {
            alert("Invalid Username");
        }
        return isMatching;
    }

    async function fetchUserDetails(username) {

        try{
            searchButton.textContent = "Searching...";
            searchButton.disabled = true;
            const url = `http://leetcode-stats-api.herokuapp.com/${username}`
            const response = await fetch(url);
            if(!response.ok) {
                throw new Error("Unable to fetch the User details");
            }
            const parsedData = await response.json();
            console.log("Logging data: ", parsedData) ;

            displayUserData(parsedData);
        }
        catch(error) {
            statsContainer.innerHTML = `<p>${error.message}</p>`
        }
        finally {
            searchButton.textContent = "Search";
            searchButton.disabled = false;
        }
    }

    function updateProgress(solved, total, label) {
        const progressDegree = (solved/total)*100;
        
        label.textContent = `${solved}/${total}`;
    }


    function displayUserData(parsedData) {
        const totalQues = parsedData.totalQuestions;        
        const totalEasyQues = parsedData.totalEasy;
        const totalMediumQues = parsedData.totalMedium;
        const totalHardQues = parsedData.totalHard;

        const solvedTotalQues = parsedData.totalSolved;
        const solvedTotalEasyQues = parsedData.easySolved;
        const solvedTotalMediumQues = parsedData.mediumSolved ;
        const solvedTotalHardQues = parsedData.hardSolved;

        updateProgress(solvedTotalEasyQues, totalEasyQues, easyLabel);
        updateProgress(solvedTotalMediumQues, totalMediumQues, mediumLabel);
        updateProgress(solvedTotalHardQues, totalHardQues, hardLabel);


    }

    searchButton.addEventListener('click', function() {
        const username = usernameInput.value;
        console.log("logggin username: ", username);
        if(validateUsername(username)) {
            fetchUserDetails(username);
        }
    })

})
const currentAnswer = { 
    'one': '',
    'two': '',
    'three': ''
};

const itemList = document.querySelectorAll('.choice-grid div');

// Add click event listeners to each item
itemList.forEach(item => {
    item.addEventListener('click', handleItemClick);
});

// Function to uncheck an item when a new choice is selected
function changeToUnchecked(questionName) {
    const id = currentAnswer[questionName];
    const items = document.querySelectorAll(`[data-choice-id='${id}']`); // Fixed selector

    items.forEach(item => {
        if (item.dataset.questionId === questionName) {
            const image = item.querySelector('.checkbox');
            image.src = 'unchecked.png';
            item.style.backgroundColor = '#f4f4f4';
            item.style.opacity = '1'; // Reset opacity when unchecked
        }
    });
}

// Function to change opacity of unselected items
function changeOpacity(question, selectedItem) {
    const items = document.querySelectorAll(`[data-question-id='${question}']`); // Fixed selector

    items.forEach(item => {
        if (item !== selectedItem) {
            item.style.opacity = '0.6'; // Dim the unselected items
        } else {
            item.style.opacity = '1'; // Ensure selected item is fully visible
        }
    });
}

// Function to reload the page when the quiz is restarted
function refreshWeb() {
    document.location.href = "index.html";
}

// Function to lock the answers and display the result
function lockToAnswer() {
    // Check if all questions are answered
    if (currentAnswer['one'] && currentAnswer['two'] && currentAnswer['three']) {
        itemList.forEach(item => {
            item.removeEventListener('click', handleItemClick); // Disable further clicks after final answer
        });

        const output = document.querySelector('.result');
        const outputTitle = output.querySelector('#result-title');
        const outputContent = output.querySelector('#result-contents');

        // Decide the result key based on the answers
        const answerKey = currentAnswer['three'] === currentAnswer['two'] ? currentAnswer['two'] : currentAnswer['one'];
        
        // Ensure that RESULTS_MAP and the answer key exist before trying to access them
        if (RESULTS_MAP[answerKey]) {
            outputTitle.innerHTML = "You got: " + RESULTS_MAP[answerKey]['title'];
            outputContent.innerHTML = RESULTS_MAP[answerKey]['contents'];
        } else {
            outputTitle.innerHTML = "Error: No matching result.";
            outputContent.innerHTML = "Something went wrong.";
        }

        output.style.display = 'block'; // Display the result section

        const restartBtn = document.querySelector('#restart-quiz');
        restartBtn.addEventListener('click', refreshWeb); // Add event listener to restart button
    }
}

// Main function that handles item click events
function handleItemClick(event) {
    const item = event.currentTarget; // Get the clicked item
    const image = item.querySelector('.checkbox');
    image.src = 'checked.png'; // Set checkbox image to "checked"
    item.style.backgroundColor = '#cfe3ff'; // Change background color for selected item
    item.style.opacity = '1'; // Set full opacity for selected item

    const questionPicked = item.dataset.questionId;

    // If the current question already has an answer, uncheck the previous one
    if (currentAnswer[questionPicked]) {
        changeToUnchecked(questionPicked);
    }

    // Change opacity of other items in the same question
    changeOpacity(questionPicked, item);

    // Update the current answer with the selected choice ID
    currentAnswer[questionPicked] = item.dataset.choiceId;

    // Check if all questions are answered, and lock the answers if so
    lockToAnswer();
}

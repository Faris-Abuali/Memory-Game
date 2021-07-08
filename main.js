document.querySelector('.control-buttons span').onclick = function () {

    let yourName = prompt("What is Your Name?");

    if (yourName == null || yourName == '') {
        document.querySelector('.name span').innerHTML = 'user';
    }
    else {
        document.querySelector('.name span').innerHTML = yourName;
    }

    // remove splash screen from the DOM
    document.querySelector('.control-buttons').remove();

    // Play Hello Sound Effect
    document.getElementById('hello').play();



    // Show All Blocks Just For Few Seconds in the Beginning, then Hide Them again
    blocks.forEach(block => {
        block.classList.add('is-flipped');
    });

    setTimeout(() => {
        blocks.forEach(block => {
            block.classList.remove('is-flipped');
        });
    }, duration * 3);

};

let duration = 1000;

let blocksContainer = document.querySelector('.memory-game-blocks');

let blocks = Array.from(blocksContainer.children);

let orderRange = [...Array(blocks.length).keys()];
// [1] Array(blocks.length) => make array of length 20, all undefined. 
// [2] But I want their keys(), which will be from [0,1,2,..,19].
// [3] Then use the spread operator "..." to convert this to array [0,1,2,3,...,19]

shuffle(orderRange);


// another way to create the array:
// let orderRange = Array.from(Array(blocks.length).keys());

// Add order css property to game blocks
blocks.forEach((block, index) => {

    block.style.order = orderRange[index];

    // Add Click Event
    block.addEventListener('click', function () {

        // Trigger the flipBlock function()
        flipBlock(block);
    });
});



// Flip Block Function
function flipBlock(selectedBlock) {

    // Add class 'is-flipped'
    selectedBlock.classList.add('is-flipped');


    // Collect All Flipped Cards
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

    // If there are TWO flipped blocks
    if (allFlippedBlocks.length == 2) {
        // console.log("2 Flipped Blocks Selected");

        // Stop Clicking Function
        stopClicking();

        // Check Mathed Blocks Function
        checkMathedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
    }


}// end flipBlock()


// Stop Clicking Function
function stopClicking() {

    // Add Class 'no-clicking' on the Main Container
    blocksContainer.classList.add('no-clicking');

    setTimeout(() => {

        // Remove Class 'no-cliking' After The Duration Passes
        blocksContainer.classList.remove('no-clicking');

    }, duration); //After the duration ends, the
}

// Check Block Match
function checkMathedBlocks(firstBlock, secondBlock) {


    let triesElement = document.querySelector('.tries span');

    // custom attributr data-technology
    if (firstBlock.dataset.technology === secondBlock.dataset.technology) {
        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');

        // Play the Sound of Success
        document.getElementById('success').play();
    }
    else {
        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

        setTimeout(() => {
            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');
        }, duration);

        // Play the Sound of Fail
        document.getElementById('fail').play();
    }
}// end function

// Shuffle Function
function shuffle(array) {

    // Setting vars
    let current = array.length,
        temp,
        random;

    while (current > 0) {

        // Get Random Number
        random = Math.floor(Math.random() * current);

        // Decrease length by one
        current--;

        // [1] Save Current Element in Stash
        temp = array[current]

        // [2] Current Element = Random Element
        array[current] = array[random];

        // [3] Random Element = Get Element From Stash
        array[random] = temp;
    }

    return array;
}

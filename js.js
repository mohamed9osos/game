let namee = document.querySelector(".name span")
let game_block = document.querySelectorAll(".game-block")
let memory_game_blocks = document.querySelector(".memory-game-blocks")
let spans = document.querySelector('.control-buttons span')
spans.onclick = function(){
    let yourName = prompt("Your Name");
    if(yourName == null || yourName == ''){
        namee.innerHTML = 'UnKnown'
    }else{
        namee.innerHTML = yourName
    }
    this.parentElement.remove()
    game_block.forEach((e)=>{
        e.classList.add('is-flipped')
    })
    setTimeout(() => {
        game_block.forEach((e)=>{
            e.classList.remove('is-flipped')
        })
    }, 1000);
};

let blocks = Array.from(memory_game_blocks.children)
let orderRange = [...Array(blocks.length).keys()]
shuffle(orderRange)

blocks.forEach((block,index)=>{
    block.style.order = orderRange[index]

    block.addEventListener('click',()=>{
        flipBlock(block)
    })
})


function shuffle(array){
    let current = array.length
    while(current > 0){
        let random = Math.floor(Math.random() * current)
        current--
        [array[current], array[random]] = [array[random],array[current]]
    }
}

function flipBlock(array){
    array.classList.add('is-flipped')
    let allFlippedBlocks = blocks.filter(flipBlock => flipBlock.classList.contains("is-flipped"))
    if(allFlippedBlocks.length === 2){
        stopClicking()
        check(allFlippedBlocks[0],allFlippedBlocks[1])
    }
}

function stopClicking(){
    memory_game_blocks.classList.add('stop')
    setTimeout(() => {
        memory_game_blocks.classList.remove('stop')
    }, 1000);
}

function check(firstBlock, secondBlock){

    if(firstBlock.dataset.technology === secondBlock.dataset.technology){
        firstBlock.classList.remove("is-flipped")
        secondBlock.classList.remove("is-flipped")

        firstBlock.classList.add("is-check")
        secondBlock.classList.add("is-check")

        document.querySelector('.success').play()
    }else{
        document.querySelector('.tries span').innerHTML = parseInt(document.querySelector('.tries span').innerHTML)  + 1
        setTimeout(() => {
            firstBlock.classList.remove("is-flipped")
            secondBlock.classList.remove("is-flipped")
        }, 1000);
        document.querySelector('.wrong').play()
    }
}
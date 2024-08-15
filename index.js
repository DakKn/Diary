let result = document.getElementById("result")
let status = document.getElementById("status")
let final=""
let local = ""
status.innerHTML = "Click Start Recognition to begin listening"

let lastItem = localStorage.getItem("last")

if(lastItem){
    final = lastItem
    result.innerHTML = final  
    local = final  
}

let speech = new webkitSpeechRecognition()
speech.continuous = true
speech.interimResults = false

//on start 
speech.onstart = function() {
    status.innerHTML = "Listening..."
}

//on end
speech.onend = function() {
    status.innerHTML = "Click Start to begin listening"
}

speech.onresult = function(event) {
    
    for(let i =0; i<event.results.length;i++){
        final = event.results[i][0].transcript 
    } 
    result.innerHTML += final+" "
    local += final+" "
 
};



function startRecognition(){
    speech.start()
}

function stopRecognition(){
    speech.stop()
}

function comma(){
    result.innerHTML += ", "
    local += ", "
}

function fullStop(){
    result.innerHTML += ". "
    local += ". "
}

function deleteAll(){
    final = ""
    result.innerHTML = final
    local = final
    localStorage.clear()
}

function save(){
    localStorage.clear()
    localStorage.setItem("last",local)

}

function read(){
    
    let utterance = new SpeechSynthesisUtterance()
    
    utterance.text = result.innerHTML
    utterance.pitch = 2
    utterance.voice = window.speechSynthesis.getVoices()[0]
    utterance.rate = 1.5
    
    //speak
    window.speechSynthesis.speak(utterance)   
}




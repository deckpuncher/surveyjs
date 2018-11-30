var questions = [];

var defaultQuestion = { 
    text : "rate your business acumen", 
    value: 1, 
    category: "category1"
};

function formInput(label){
    var value = "<label> + " + label + "<input type='text'></label>";
    return value;
}

function initSurvey(){
    // first load
    if (!questions.length){
        
    }
}

window.onload = initSurvey;

function Question(heading, prompt, category, isYesNo) {
    this.heading = heading;
    this.prompt = prompt;
    this.category = category;
    this.isYesNo = isYesNo;
    this.statements = [];
    this.rules = [];
    this.answer = null;
    this.priority = null;

    this.addStatement = function (statement) {
        this.statements.push(statement);
    }

    this.addRule = function (score, result) {
        this.rules.push(new QuestionRule(score, result));
    }

    this.recordAnswer = function (score) {
        var ruleToFire = null;
        this.rules.forEach(function (rule) {
            if (score >= rule.requiredScore) {
                ruleToFire = rule;
            }
        })

        this.answer = score;
        return ruleToFire;
    }
}

function QuestionRule(requiredScore, result) {
    this.requiredScore = requiredScore;
    this.result = result;
}

function Survey() {
    this.questions = [];
    this.yesNoQuestions = [];
    this.currentQuestionIndex = 0;

    this.currentQuestion = function () {
        return this.questions[this.currentQuestionIndex];
    }

    this.nextQuestion = function () {
        this.currentQuestionIndex++;
    }

    this.completed = function () {
        var completed = true;
        this.questions.forEach(function (question) {
            if (!question.answer) {
                completed = false;
            }
        });

        return completed;
    }
}

function initSurvey() {
    var q1 = new Question("Question 1", "Of these statements, how many can you confidently answer YES to?", "VISION");
    q1.addStatement("I have this thing");
    q1.addStatement("I have this other thing");
    q1.addStatement("I do this thing");
    q1.priority = 1;

    q1.addRule(2, "you should visit this link");
    survey.questions.push(q1);

    var q2 = new Question("Question 2", "2Of these statements, how many can you confidently answer YES to?", "WHY");
    q2.addStatement("2I have this thing");
    q2.addStatement("2I have this other thing");
    q2.addStatement("2I do this thing");
    q2.priority = 1;

    q2.addRule(2, "you should visit this link2");
    survey.questions.push(q2);

    var q3 = new Question("Question 3", "Of these statements, how many can you confidently answer YES to?", "CUSTOMER");
    q3.addStatement("2I have this thing");
    q3.addStatement("2I have this other thing");
    q3.addStatement("2I do this thing");
    q3.priority = 2;
    survey.questions.push(q3);

    var q4 = new Question("Question 4", "Of these statements, how many can you confidently answer YES to?", "PRODUCTS");
    q4.addStatement("2I have this thing");
    q4.addStatement("2I have this other thing");
    q4.addStatement("2I do this thing");
    q4.priority = 3;
    survey.questions.push(q4);

    renderSurvey(survey);
}

function renderSurvey(survey) {
    // make the anchor point configurable
    // document.body.insertAdjacentHTML('beforeend', buildTag("div", "", "id='survey-container'"));
    survey.questions.forEach(renderQuestion);
    renderQuestion(survey.yesNoQuestions[0], 0);
}

function renderQuestion(question, questionNumber) {
    // build from inside out
    var inner = [];
    inner.push(buildTag("div", buildTag("span", question.heading), "class='heading'"));
    inner.push(buildTag("div", buildTag("span", question.prompt), "class='question'"));

    var buttons = [];
    if (question.isYesNo) {
        var attrs = [];
        attrs.push("value='Yes'");
        attrs.push("onclick='yesNoAnswerClicked(this)'");
        buttons.push(buildTag("button", "Yes", attrs.join(" ")));

        attrs = [];
        attrs.push("value='No'");
        attrs.push("onclick='yesNoAnswerClicked(this)'");
        buttons.push(buildTag("button", "No", attrs.join(" ")))
    }
    else {
        var statements = [];
        question.statements.forEach(function (statement) {
            statements.push(buildTag("li", statement));
        });
        inner.push(buildTag("ul", statements.join("")));


        for (i = 0; i < question.statements.length; i++) {
            var attrs = [];
            attrs.push(`value=${i}`);
            attrs.push("onclick='answerClicked(this)'");
            attrs.push(`survey-question-num='${questionNumber}'`);
            var button = buildTag("button", i, attrs.join(" "));

            buttons.push(button);
        }
    }

    inner.push(buildTag("div", buttons.join(""), "class='button-row'"));

    var container = document.body.querySelector("#survey-container");
    container.insertAdjacentHTML('beforeend', buildTag("div", inner.join(""), `class='survey-question' survey-question-num='${questionNumber}'`));
}

function answerClicked(button) {
    var parent = button.closest(".survey-question");
    var questionNum = parent.getAttribute("survey-question-num");
    var rule = survey.questions[questionNum].recordAnswer(button.value);
    renderAnswerResponse(rule, parent);

    if (survey.completed()) {
        var table = document.querySelector("#survey-results");
        if (table) {
            table.parentNode.removeChild(table);
        }
        var questions = survey.questions.sort(compare);

        var tableRows = [];
        for (i = 0; i++; i < questions.length) {

        }

        var priority = null;
        var closeRow = false;

        questions.forEach(function (question, index) { 
            var warning = question.answer < (question.statements.length / 2);
            if (priority !== question.priority) {
                priority = question.priority;

                tableRows.push("<tr>");
            }
            else {
                closeRow = true;
            }

            tableRows.push("<td ");
            if (warning){
                tableRows.push("class='warning'");
            }
            tableRows.push(">");
            tableRows.push(question.category);
            tableRows.push("</td>");

            if (closeRow) {
                tableRows.push("</tr>");
                closeRow = false;
            }
        });

        var container = document.body.querySelector("#survey-container");
        container.insertAdjacentHTML('beforeend', buildTag("table", tableRows.join(""), "id='survey-results'"));
    }
}

function renderAnswerResponse(rule, parent) {
    var answer = parent.querySelector(".survey-answer-statement");
    if (answer) {
        answer.parentNode.removeChild(answer);
    }
    if (rule) {
        parent.insertAdjacentHTML('beforeend', buildTag("div", rule.result, "class='survey-answer-statement'"));
    }
}

function yesNoAnswerClicked(button) {
    var questionNum = button.closest(".survey-question").getAttribute("survey-question-num")
    if (button.value === "Yes") {
        var next = parseInt(questionNum) + 1;
        if (survey.yesNoQuestions.length >= next + 1) {
            renderQuestion(survey.yesNoQuestions[next], next);
        }
    }
    else {
        var rule = survey.yesNoQuestions[questionNum].recordAnswer(0);
        var parent = button.closest(".survey-question");
        renderAnswerResponse(rule, parent)
    }
}

function compare(a, b) {
    if (a.priority < b.priority)
        return -1;
    if (a.priority > b.priority)
        return 1;
    return 0;
}

function buildTag(tag, value, attributes) {
    var result = [];
    result.push("<");
    result.push(tag);
    if (attributes) {
        result.push(" ");
        result.push(attributes);
    }
    result.push(">");
    result.push(value);
    result.push("</");
    result.push(tag);
    result.push(">");

    return result.join("");
}

var survey = new Survey();
window.onload = initSurvey;

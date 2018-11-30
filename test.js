function Question(heading, prompt) {
    this.heading = heading;
    this.prompt = prompt;
    this.statements = [];
    this.rules = [];
    this.answer = null;

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
    var q1 = new Question("Your Product", "Of these statements, how many can you confidently answer YES to?");
    q1.addStatement("I have this thing");
    q1.addStatement("I have this other thing");
    q1.addStatement("I do this thing");

    q1.addRule(2, "you should visit this link");
    survey.questions.push(q1);

    var q2 = new Question("2Your Product", "2Of these statements, how many can you confidently answer YES to?");
    q2.addStatement("2I have this thing");
    q2.addStatement("2I have this other thing");
    q2.addStatement("2I do this thing");

    q2.addRule(2, "you should visit this link2");
    survey.questions.push(q2);

    document.body.innerHTML += buildTag("div", "", "id='survey-container'");

    renderSurvey(survey);
}

function renderSurvey(survey) {
    survey.questions.forEach(renderQuestion);
}

function renderQuestion(question, questionNumber) {
    // build from inside out
    var inner = [];
    inner.push(buildTag("div", buildTag("span", question.heading), "class='heading'"));
    inner.push(buildTag("div", buildTag("span", question.prompt), "class='question'"));

    var statements = [];
    question.statements.forEach(function (statement) {
        statements.push(buildTag("li", statement));
    });
    inner.push(buildTag("ul", statements.join("")));

    var buttons = [];
    for (i = 0; i < question.statements.length; i++) {
        var attrs = [];
        attrs.push("value=" + i);
        attrs.push("onclick='answerClicked(this)'");
        attrs.push(`survey-question-num='${questionNumber}'`);
        var button = buildTag("button", i, attrs.join(" "));

        buttons.push(button);
    }

    inner.push(buildTag("div", buttons.join(""), "class='button-row'"));

    var container = document.body.querySelector("#survey-container");
    container.insertAdjacentHTML('beforeend', buildTag("div", inner.join(""), `class='survey-question' survey-question-num='${questionNumber}'`));
}

function answerClicked(button) {
    var questionNum = button.closest(".survey-question").getAttribute("survey-question-num");
    var rule = survey.questions[questionNum].recordAnswer(button.value);
    var parent = document.querySelector(`div[survey-question-num='${questionNum}']`);
    var answer = parent.querySelector(".survey-answer-statement");
    if (answer) {
        answer.parentNode.removeChild(answer);
    }
    if (rule) {
        parent.innerHTML += buildTag("div", rule.result, "class='survey-answer-statement'");
    }
    if (survey.completed()) {
        var table = document.querySelector("#survey-results");
        if (table) {
            table.parentNode.removeChild(table);
        }
        var tableRows = [];
        survey.questions.forEach(function (question, index) {
            tableRows.push("<tr>");
            tableRows.push("<td>");
            tableRows.push("Question ");
            tableRows.push(index + 1);
            tableRows.push("</td><td>");
            tableRows.push(question.answer);
            tableRows.push("</td>");
            tableRows.push("</tr>");
        });

        var container = document.body.querySelector("#survey-container");
        container.insertAdjacentHTML('beforeend', buildTag("table", tableRows.join(""), "id='survey-results'"));
    }
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

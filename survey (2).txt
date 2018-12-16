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
    var questions = [
        {
            "heading": "Your VISION & WHY",
            "prompt": "Of these statements, how many can you confidently answer YES to?",
            "category": "VISION",
            "statements": [
                "I know what I want my business to look like in 3-5 years time",
                "I have either written my vision down or created a mood board previously, showing what the vision is",
                "I know the greater purpose of my business and the change I want to make in people’s lives",
                "I understand why I think it's important that I run my own business, as opposed to being in traditional employment"
            ],
            "answer": null,
            "goodScore": 3,
            "priority": 1,
            "result" : {
                "text" : "Your answers and the priority grid of the key areas show you need to work on your VISION and WHY right now.",
                "url" : "https://www.themakers.academy/free-stuff/makers-audit-tool/result-vision-why/"
            }
        },
        {
            "heading": "Your PRODUCT",
            "prompt": "Of these statements, how many can you confidently answer YES to?",
            "category": "PRODUCT",
            "statements": [
                "Within my products I have distinct price points (for example entry level, mid level, high end)",
                "When pricing my products, I have included all costs of materials, the cost of labour time, and included some profit margin",
                "I have allowed for wholesale pricing of my product",
                "I have researched my customer and am confident I know the value they see in my product",
                "I can easily list all the benefits that the features of my product brings to my customer",
                "I know where my product sits in the product market"
            ],
            "answer": null,
            "goodScore": 4,
            "priority": 2,
            "result" : {
                "text" : "Your answers and the priority grid of the key areas show you need to work on your PRODUCT right now.",
                "url" : "https://www.themakers.academy/free-stuff/makers-audit-tool/result-product/"
            }
        },
        {
            "heading": "Your CUSTOMER",
            "prompt": "Of these statements, how many can you confidently answer YES to?",
            "category": "CUSTOMER",
            "statements": [
                "I know what my customers' deeper level pain points are",
                "I can describe my customer fairly intimately in a few sentences",
                "I know what motivates my customer to buy my product",
                "I know where I can reach out to potential customers where they will want to listen",
                "I know what my customers values are",
                "I know how to speak effectively to my customer",
                "I know the demographics of my customer well",
                "I know the psychographics and behaviours of my customer well"
            ],
            "goodScore": 6,
            "answer": null,
            "priority": 2,
            "result" : {
                "text" : "Your answers and the priority grid of the key areas show you need to work on your CUSTOMER right now.",
                "url" : "https://www.themakers.academy/free-stuff/makers-audit-tool/result-customer/"
            }
        },
        {
            "heading": "Your MESSAGING",
            "prompt": "Of these statements, how many can you confidently answer YES to?",
            "category": "MESSAGING",
            "statements": [
                "I am confident I know what the purpose of my business is and could tell someone my mission statement if they asked me",
                "My brand personality comes across clearly in all touch points with my customers",
                "The style of all the photography and imaging in my business matches my brand personality",
                "I know what the core values of my business are",
                "My visual branding is consistent with my business personality",
                "My photography is high-quality across all touch-points"
            ],
            "answer": null,
            "goodScore": 5,
            "priority": 3,
            "result" : {
                "text" : "Your answers and the priority grid of the key areas show you need to work on your MESSAGING right now",
                "url" : "https://www.themakers.academy/free-stuff/makers-audit-tool/result-messaging/"
            }
        },
        {
            "heading": "Your WEBSITE",
            "prompt": "Of these statements, how many can you confidently answer YES to?",
            "category": "WEBSITE",
            "statements": [
                "I have tested the purchase process thoroughly",
                "My products are easily accessible from the front page",
                "I've included my story and photo on my About page",
                "What I sell is immediately clear to new visitors to my website",
                "I know how much traffic my site receives every month",
                "I know what my conversion rate is (number of sales divided by monthly visitors)",
                "I understand how SEO works to drive organic traffic to my website",
                "I have an email list to build relationships with my customers"
            ],
            "answer": null,
            "goodScore": 6,
            "priority": 4,
            "result" : {
                "text" : "Your answers and the priority grid of the key areas show you need to work on your WEBSITE right now",
                "url" : "https://www.themakers.academy/free-stuff/makers-audit-tool/result-website/"
            }
        },
        {
            "heading": "Your PLAN",
            "prompt": "Of these statements, how many can you confidently answer YES to?",
            "category": "PLAN",
            "statements": [
                "I have measurable goals that are moving me towards what I want my business to look like in 3-5 years time",
                "I am confident that everything I do day-to-day is moving me towards those goals",
                "I believe my business can be a success",
                "I have a clear strategy on how to move my business forward",
                "I have clear income goals and I know how much I have to sell to achieve these",
                "I follow action plans for every goal I set"
            ],
            "answer": null,
            "goodScore": 5,
            "priority": 5,
            "result" : {
                "text" : "Your answers and the priority grid of the key areas show you need to work on your PLAN right now",
                "url" : "https://www.themakers.academy/free-stuff/makers-audit-tool/result-plan/"
            }
        },
        {
            "heading": "Your MARKETING",
            "prompt": "Of these statements, how many can you confidently answer YES to?",
            "category": "MARKETING",
            "statements": [
                "I have clear objectives for my marketing efforts",
                "I have a defined strategy for every marketing campaign",
                "I know how to use social media effectively to grow my brand",
                "I know definitively if blogging is a good marketing strategy for my business",
                "I send regular emails to my subscribers",
                "I know the ROI of all emails I send",
                "I know how to target my customers effectively when using advertising",
                "I track all my marketing efforts and know what works and what doesn't for my business"
            ],
            "answer": null,
            "goodScore": 6,
            "priority": 6,
            "result" : {
                "text" : "Your answers and the priority grid of the key areas show you need to work on your MARKETING right now",
                "url" : "https://www.themakers.academy/free-stuff/makers-audit-tool/result-marketing"
            }
        },
        {
            "heading": "Your OPERATIONS",
            "prompt": "Of these statements, how many can you confidently answer YES to?",
            "category": "OPERATIONS",
            "statements": [
                "I have a set of procedures or workflows I follow for every repeatable task in my business",
                "I know what my effective hourly rate is for all the different tasks in my business",
                "I have identified what tasks I can or should be able to soon outsource to others",
                "I have identified which times of the day I am most productive",
                "I have developed a solid time management system for the average week and month",
                "I regularly undertake professional development for my industry and my business",
                "I track all my income and expenses diligently",
                "I know all the tax and legal obligations for my own business",
                "I have scheduled time for gathering inspiration and filling my creative mind",
                "I have set times in my schedule for rest and rejuvenation"
            ],
            "answer": null,
            "goodScore": 7,
            "priority": 7,
            "result" : {
                "text" : "Your answers and the priority grid of the key areas show you need to work on your OPERATIONS right now",
                "url" : "https://www.themakers.academy/free-stuff/makers-audit-tool/result-operations"
            }
        }
    ]

    survey.questions = questions;
    renderSurvey(survey);
}

function renderSurvey(survey) {
    // make the anchor point configurable
    // document.body.insertAdjacentHTML('beforeend', buildTag("div", "", "id='survey-container'"));
    survey.questions.forEach(renderQuestion);
    //renderQuestion(survey.yesNoQuestions[0], 0);
    var container = document.body.querySelector("#survey-container");
    container.insertAdjacentHTML('beforeend', buildTag("p", "Makers Priority Grid"));
    renderGrid();
    renderResult();
}

function renderQuestion(question, questionNumber) {
    if (!question) {
        return;
    }
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


        for (i = 0; i < question.statements.length + 1; i++) {
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
    var rule = recordAnswer(survey.questions[questionNum], button.value);

    var buttonRow = button.closest(".button-row");
    buttonRow.querySelectorAll(".answered").forEach(m => { m.classList.remove("answered") });
    button.classList.add("answered");
    //renderAnswerResponse(rule, parent);
    renderGrid();
    renderResult();
}

function renderGrid() {
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
        var warning = question.answer ? question.answer < question.goodScore : false;
        if (priority !== question.priority) {
            priority = question.priority;

            tableRows.push("<tr>");
        }
        else {
            closeRow = true;
        }

        tableRows.push("<td ");
        if (warning) {
            tableRows.push("class='warning'");
        }
        if (index < 1 || index > 2) {
            tableRows.push("colspan=2");
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

function renderResult() {
    var finale = document.querySelector("#survey-finale");
    if (finale) {
        finale.parentNode.removeChild(finale);
    }

    if (survey.questions.some(m => !m.answer)) {
        return;
    }

    var question = survey.questions.find(m=> m.answer < m.goodScore);

    var container = document.body.querySelector("#survey-container");
    var href = `href='https://www.themakers.academy/contact/'`;
    var link = buildTag("a", "If that doesn't sound quite right or you just need a bit more guidance, feel free to EMAIL ME directly!", href);
    var span = buildTag("p", "Your answers show that you have things pretty well under control in terms of the key areas of your business!");
    var target = " target='_blank'";
    if (question){
        href = `href='${question.result.url}'`;
        link = buildTag("a", "CLICK HERE for more about your result and recommendations on what to do next", href + target);
        span = buildTag("p", question.result.text);
    }
    container.insertAdjacentHTML('beforeend', buildTag("div", span + link, "id=survey-finale"));
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

function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'my_data.json', true); // Replace 'my_data' with the path to your file
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
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

function recordAnswer(question, score) {
    question.answer = score;
}

var survey = new Survey();
window.onload = initSurvey;

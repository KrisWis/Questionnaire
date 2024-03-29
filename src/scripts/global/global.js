/* Объявление всех переменных */
const create__survey = document.getElementById("create__survey");
const all_elements = document.querySelectorAll(".create__survey--hide_animation");
const panels = document.getElementById("panels");
const create_survey_page = document.getElementById("create_survey_page");
const create_survey_page__continue = document.getElementById("create_survey_page__continue");
const create_survey_page__name = document.getElementById("create_survey_page__name");
const create_survey_page__name_elements = document.querySelectorAll(".create_survey_type:not(.create_survey_page, .create_survey_page__continue)");
const create_survey_page__security = document.getElementById("create_survey_page__security");
const create_survey_page__create_question = document.getElementById("create_survey_page__create_question");
let anonim__checkbox = document.getElementById("anonim__checkbox");
let upp_security__checkbox = document.getElementById("upp_security__checkbox");
let create_question__types_anonim__icon = document.getElementById("create_question__types--anonim");
let create_question__types_upp_security__icon = document.getElementById("create_question__types--upp_security");
const body = document.querySelector("body");
let create_question__header__desc = document.getElementById("create_question__header--desc--2");
let create_question__header__inputs = document.querySelectorAll(".create_question__header--input");
let create_question__header__edits = document.querySelectorAll(".create_question__header--edit");
const create_question__add_answer = document.getElementById("create_question__add_answer--2");
const create_question__header = document.getElementById("create_question__header--2");
const create_question = document.getElementById("create_question");
const create_question__icon = document.getElementById("create_question--icon");
let create_question__answers_count = 0;
let create_question__count = 2;
const create_questions__save = document.getElementById("create_questions--save");
const create_survey_page__end = document.getElementById("create_survey_page__end");
const create_survey_page__share__link = document.getElementById("create_survey_page__share--link");
const create_survey_page__share__link__pop_up_window = document.getElementById("create_survey_page__share__link--pop_up_window");
const create_survey_page__share__qr = document.getElementById("create_survey_page__share--qr");
const create_survey__pop_up_window_survey_created = document.getElementById("create_survey--pop_up_window-survey_created");
const create_questions = document.getElementById("create_questions");
const create_survey_page_name__edit = document.getElementById("create_survey_page_name__edit");
const create_survey_page_name__input = document.getElementById("create_survey_page_name__input");
const save__answers_error = document.getElementById("save--answers_error");
const save__correct_error = document.getElementById("save--correct_error");
const created_surveys = document.getElementById("created_surveys");
const survey_panel__pagination__left_arrow = document.getElementById("survey_panel__pagination--left_arrow");
const survey_panel__pagination__right_arrow = document.getElementById("survey_panel__pagination--right_arrow");
let survey_panel__pagination__counter = 0;
let create_survey__existing_surveys = {};
let available_surveys__existing_surveys = {};
const available_surveys = document.getElementById("available_surveys");
const available_surveys__none = document.getElementById("available_surveys__none");
const available_surveys__pagination__left_arrow = document.getElementById("available_surveys__pagination--left_arrow");
const available_surveys__pagination__right_arrow = document.getElementById("available_surveys__pagination--right_arrow");
const stats_panel__participants_amount = document.getElementById("stats_panel--participants_amount");
const stats__answers__answers = document.getElementById("stats--answers__answers");
const stats__answers__pie_chart = document.getElementById("stats--answers__pie_chart");
const stats__activities = document.getElementById("stats__activities");
const stats_panel__caption = document.getElementById("stats_panel--caption");
/* Объявление всех функций, которые будут использоваться глобально в коде */
// Функция скрытия элемента
function hide(el) {
    el.classList.add("hidden");
}
// Функция видения элемента
function unhide(el) {
    el.classList.remove("hidden");
}
// Функция для включения всех функций ответов
function answer_functions(create_question__preset_answer__edit, create_question__preset_answer__input, create_question__preset_answer__checkbox, create_question__preset_answer__menu, create_question__open_answer__menu, create_question__open_answer__checkbox, create_question__delete, create_question_active, question) {
    /* Функционал того, что по нажатию на карандашик, таргет делается на инпут */
    create_question__preset_answer__edit.addEventListener("click", function () {
        create_question__preset_answer__input.focus();
    });
    /* Нажатие на кнопку предустановленного ответа и открытие соответствующего меню */
    create_question__preset_answer__checkbox.addEventListener("change", function () {
        unhide(create_question__preset_answer__menu);
        hide(create_question__open_answer__menu);
        create_question__open_answer__checkbox.checked = false;
    });
    /* Нажатие на кнопку открытого ответа и открытие соответствующего меню */
    create_question__open_answer__checkbox.addEventListener("change", function () {
        unhide(create_question__open_answer__menu);
        hide(create_question__preset_answer__menu);
        create_question__preset_answer__checkbox.checked = false;
    });
    /* Функцонал того, что по нажатию на крестик, ответ удаляется. */
    create_question__delete.addEventListener("click", function () {
        create_question_active.removeChild(question);
    });
}
// Функция для создания HTML опроса
function create_survey(edit_survey_link, survey_id, survey_name, survey_link) {
    // Создание блоков-ссылок на опросы в "Создать опрос"
    let create_link__request = `<a href="${edit_survey_link}" class="survey hidden opacity-0 create__survey--hide_animation" id="survey--${survey_id}">

            <h3 class="survey--caption">${survey_name}</h3>

            <div class="survey__edit">
                <p>Редактировать</p>
                <i class="fa fa-edit" aria-hidden="true"></i>
            </div>
            
        </a>`;
    created_surveys.insertAdjacentHTML(`beforeend`, create_link__request);
    // Создание ссылок на все опросы в блоке "доступные опросы"
    create_link__request =
        `<a href="${survey_link}" class="available_survey hidden opacity-0" id="available_survey--${survey_id}">
            <h3 class="available_survey--caption">${survey_name}</h3>
        </a>`;
    available_surveys.insertAdjacentHTML(`beforeend`, create_link__request);
}
// Функция для выполнения действий после создания опроса
function after_creating_survey() {
    available_surveys__none.classList.add("hidden");
    let survey = document.querySelector(".survey");
    if (survey) {
        survey.classList.remove("opacity-0");
        unhide(survey);
    }
}
// Функция для настройки пагинации
function pagination_func(array, obj, surveys_length) {
    for (let el of array) {
        if (Array.from(array).indexOf(el) > surveys_length) {
            obj[el.id] = "unselect";
        }
        else {
            obj[el.id] = "select";
        }
    }
}
// Функция для отправки HTTP запроса 
async function fetch_post(HTTP_URL, HTTP_body) {
    let response = await fetch(HTTP_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(HTTP_body)
    });
    return response;
}
// Функция для сохранения всех данных вопросов
function save_questions() {
    /* Сохранение имени и описания вопросов */
    const questions = document.querySelectorAll(".create_question_active");
    let all_questions = {};
    for (let question of questions) {
        let element_question_id = question.id;
        let question_name = document.querySelector(`#${element_question_id} .create_question__header--input`).value;
        let question_desc = document.querySelector(`#${element_question_id} .create_question__header--desc_input`).value;
        let answers = document.querySelectorAll(`#${element_question_id} .create_question__answer_types`);
        let all_answers = {};
        let question_id = element_question_id.split("--")[1];
        for (let answer of answers) {
            let answers_id = Number(answer.id.split("--")[3]);
            let answer_type;
            answer_type = document.getElementById(`create_question--${question_id}__preset_answer--checkbox--${answers_id}`).checked ? 'preset' : 'open';
            let answer_correct;
            if (answer_type == 'preset') {
                answer_correct = document.getElementById(`question--${question_id}__preset_answer__correct_answer--checkbox--${answers_id}`).checked;
            }
            else {
                answer_correct = document.getElementById(`question--${question_id}__open_answer__correct_answer--checkbox--${answers_id}`).checked;
            }
            let answer_text;
            try {
                answer_text = document.getElementById(`create_question--${question_id}--preset_answer__input--${answers_id}`).value;
            }
            catch {
                answer_text = "";
            }
            all_answers[`${answers_id}`] = { type: answer_type, correct: String(answer_correct), answer_text: answer_text };
        }
        all_questions[question.id] = { name: question_name, desc: question_desc, answers: all_answers };
    }
    return all_questions;
}
// Функция для реверса объекта
function obj_reverse(obj) {
    let new_obj = {};
    let rev_obj = Object.keys(obj).reverse();
    rev_obj.forEach(function (i) {
        new_obj[i] = obj[i];
    });
    return new_obj;
}
// Функция для выдачи случайного цвета
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
/* Функции для работы с куки */
function setCookie(name, value, options = {}) {
    options = {
        path: '/',
        // при необходимости добавьте другие значения по умолчанию
        ...options
    };
    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }
    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }
    document.cookie = updatedCookie;
}
function getCookie(name) {
    let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
function deleteCookie(name) {
    setCookie(name, "", {
        'max-age': -1
    });
}
//# sourceMappingURL=global.js.map
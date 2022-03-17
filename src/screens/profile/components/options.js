export const optionQuestionnaire = {
    fields: [
        // {
        //     label: 'Язык',
        //     value: 'language',
        //     type: "bool",
        //     default: '',
        //     list_value: [{label: 'ру', value: 'ру'}, {label: 'eng', value: 'eng'}],
        // },
        {
            label: 'Дата рождения',
            value: 'date_birth',
            type: "date",
            default: '',
        },
        {
            label: 'Пол',
            value: 'gender',
            type: "bool",
            default: '',
            list_value: [{label: 'Мужской', value: 'Мужской'}, {label: 'Женский', value: 'Женский'}, {label: 'Не указано', value: 'Не указано'}],
        },
        {
            label: 'Страна рождения',
            value: 'country_birth',
            type: "input",
            default: '',
        },
        {
            label: 'Страна проживания',
            value: 'country_residence',
            type: "input",
            default: '',
        },
        {
            label: 'Город проживания',
            value: 'city_residence',
            type: "input",
            default: '',
        },
        {
            label: 'Какую музыку любите слушать?',
            value: 'music',
            type: "box",
            default: '',
            list_value: [{label: 'Классика', value: 'Классика'}, {label: 'Рок', value: 'Рок'}, {label: 'Поп', value: 'Поп'},
                {label: 'Джаз', value: 'Джаз'}, {label: 'Рэп', value: 'Рэп'}, {label: 'Фольк', value: 'Фольк'},
                {label: 'Иное', value: 'Иное'}],
        },
        {
            label: 'Кто вы по натуре?',
            value: 'nature',
            type: "bool",
            default: '',
            list_value: [{label: 'Интраверт', value: 'Интраверт'}, {label: 'Экстраверт', value: 'Экстраверт'}, {label: 'Не знаю', value: 'Не знаю'}],
        },
        {
            label: 'Ваш уровень знакомства с классикой',
            value: 'level',
            type: "bool",
            default: '',
            list_value: [{label: 'Не слушаю и не понимаю, или слушаю редко и мало', value: '0'}, {label: 'Люблю популярную классику', value: '1'}
                , {label: 'Слушаю разную музыку разных эпох, разбираюсь в них', value: '2'}, {label: 'Имею академическое музыкальное образование', value: '3'}
                , {label: 'Хорошо разбираюсь в классической музыке, люблю слушать сложную музыку', value: '4'}],
        },
        {
            label: 'Насколько активная у вас жизнь?',
            value: 'active_life',
            type: "bool",
            default: '',
            list_value: [{label: 'Очень активная', value: 'Очень активная'}, {label: 'Активная', value: 'Активная'}, {label: 'Средняя', value: 'Средняя'},
                {label: 'Пассивная', value: 'Пассивная'}, {label: 'Очень пассивная', value: 'Очень пассивная'}],
        },
    ],
}
angular.module("ngLocale", [], ["$provide", function ($provide) {
    var PLURAL_CATEGORY = {ZERO: "zero", ONE: "one", TWO: "two", FEW: "few", MANY: "many", OTHER: "other"};
    $provide.value("$locale", {
        "DATETIME_FORMATS": {
            "MONTH": ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"],
            "SHORTMONTH": ["янв.", "февр.", "марта", "апр.", "мая", "июня", "июля", "авг.", "сент.", "окт.", "нояб.", "дек."],
            "DAY": ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"],
            "SHORTDAY": ["вс", "пн", "вт", "ср", "чт", "пт", "сб"],
            "AMPMS": ["AM", "PM"],
            "medium": "dd.MM.yyyy H:mm:ss",
            "short": "dd.MM.yy H:mm",
            "fullDate": "EEEE, d MMMM y 'г'.",
            "longDate": "d MMMM y 'г'.",
            "mediumDate": "dd.MM.yyyy",
            "shortDate": "dd.MM.yy",
            "mediumTime": "H:mm:ss",
            "shortTime": "H:mm"
        },
        "NUMBER_FORMATS": {
            "DECIMAL_SEP": ",",
            "GROUP_SEP": " ",
            "PATTERNS": [{
                "minInt": 1,
                "minFrac": 0,
                "macFrac": 0,
                "posPre": "",
                "posSuf": "",
                "negPre": "-",
                "negSuf": "",
                "gSize": 3,
                "lgSize": 3,
                "maxFrac": 3
            }, {
                "minInt": 1,
                "minFrac": 2,
                "macFrac": 0,
                "posPre": "",
                "posSuf": " \u00A4",
                "negPre": "-",
                "negSuf": " \u00A4",
                "gSize": 3,
                "lgSize": 3,
                "maxFrac": 2
            }],
            "CURRENCY_SYM": "руб"
        },
        "pluralCat": function (n) {
            if ((n % 10) == 1 && (n % 100) != 11) {
                return PLURAL_CATEGORY.ONE;
            }
            if ((n % 10) >= 2 && (n % 10) <= 4 && ((n % 100) < 12 || (n % 100) > 14) && n == Math.floor(n)) {
                return PLURAL_CATEGORY.FEW;
            }
            if ((n % 10) == 0 || ((n % 10) >= 5 && (n % 10) <= 9) || ((n % 100) >= 11 && (n % 100) <= 14) && n == Math.floor(n)) {
                return PLURAL_CATEGORY.MANY;
            }
            return PLURAL_CATEGORY.OTHER;
        },
        "id": "ru"
    });
}]);
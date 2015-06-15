angular.module("ngLocale", [], ["$provide", function ($provide) {
    var PLURAL_CATEGORY = {ZERO: "zero", ONE: "one", TWO: "two", FEW: "few", MANY: "many", OTHER: "other"};
    $provide.value("$locale", {
        "DATETIME_FORMATS": {
            "MONTH": ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"],
            "SHORTMONTH": ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
            "DAY": ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"],
            "SHORTDAY": ["dom", "seg", "ter", "qua", "qui", "sex", "sáb"],
            "AMPMS": ["AM", "PM"],
            "medium": "dd/MM/yyyy HH:mm:ss",
            "short": "dd/MM/yy HH:mm",
            "fullDate": "EEEE, d 'de' MMMM 'de' y",
            "longDate": "d 'de' MMMM 'de' y",
            "mediumDate": "dd/MM/yyyy",
            "shortDate": "dd/MM/yy",
            "mediumTime": "HH:mm:ss",
            "shortTime": "HH:mm"
        },
        "NUMBER_FORMATS": {
            "DECIMAL_SEP": ",",
            "GROUP_SEP": ".",
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
                "posPre": "\u00A4",
                "posSuf": "",
                "negPre": "(\u00A4",
                "negSuf": ")",
                "gSize": 3,
                "lgSize": 3,
                "maxFrac": 2
            }],
            "CURRENCY_SYM": "R$"
        },
        "pluralCat": function (n) {
            if (n == 1) {
                return PLURAL_CATEGORY.ONE;
            }
            return PLURAL_CATEGORY.OTHER;
        },
        "id": "pt"
    });
}]);
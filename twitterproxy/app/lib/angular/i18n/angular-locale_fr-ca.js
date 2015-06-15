angular.module("ngLocale", [], ["$provide", function ($provide) {
    var PLURAL_CATEGORY = {ZERO: "zero", ONE: "one", TWO: "two", FEW: "few", MANY: "many", OTHER: "other"};
    $provide.value("$locale", {
        "DATETIME_FORMATS": {
            "MONTH": ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"],
            "SHORTMONTH": ["janv.", "févr.", "mars", "avr.", "mai", "juin", "juil.", "août", "sept.", "oct.", "nov.", "déc."],
            "DAY": ["dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi"],
            "SHORTDAY": ["dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam."],
            "AMPMS": ["AM", "PM"],
            "medium": "yyyy-MM-dd HH:mm:ss",
            "short": "yy-MM-dd HH:mm",
            "fullDate": "EEEE d MMMM y",
            "longDate": "d MMMM y",
            "mediumDate": "yyyy-MM-dd",
            "shortDate": "yy-MM-dd",
            "mediumTime": "HH:mm:ss",
            "shortTime": "HH:mm"
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
                "negPre": "(",
                "negSuf": " \u00A4)",
                "gSize": 3,
                "lgSize": 3,
                "maxFrac": 2
            }],
            "CURRENCY_SYM": "$"
        },
        "pluralCat": function (n) {
            if (n >= 0 && n < 2) {
                return PLURAL_CATEGORY.ONE;
            }
            return PLURAL_CATEGORY.OTHER;
        },
        "id": "fr-ca"
    });
}]);
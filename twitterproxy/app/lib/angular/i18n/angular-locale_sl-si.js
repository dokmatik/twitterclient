angular.module("ngLocale", [], ["$provide", function ($provide) {
    var PLURAL_CATEGORY = {ZERO: "zero", ONE: "one", TWO: "two", FEW: "few", MANY: "many", OTHER: "other"};
    $provide.value("$locale", {
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
                "posPre": "",
                "posSuf": " \u00A4",
                "negPre": "-",
                "negSuf": " \u00A4",
                "gSize": 3,
                "lgSize": 3,
                "maxFrac": 2
            }],
            "CURRENCY_SYM": "€"
        },
        "pluralCat": function (n) {
            if ((n % 100) == 1) {
                return PLURAL_CATEGORY.ONE;
            }
            if ((n % 100) == 2) {
                return PLURAL_CATEGORY.TWO;
            }
            if ((n % 100) == 3 || (n % 100) == 4) {
                return PLURAL_CATEGORY.FEW;
            }
            return PLURAL_CATEGORY.OTHER;
        },
        "DATETIME_FORMATS": {
            "MONTH": ["januar", "februar", "marec", "april", "maj", "junij", "julij", "avgust", "september", "oktober", "november", "december"],
            "SHORTMONTH": ["jan.", "feb.", "mar.", "apr.", "maj", "jun.", "jul.", "avg.", "sep.", "okt.", "nov.", "dec."],
            "DAY": ["nedelja", "ponedeljek", "torek", "sreda", "četrtek", "petek", "sobota"],
            "SHORTDAY": ["ned", "pon", "tor", "sre", "čet", "pet", "sob"],
            "AMPMS": ["dop.", "pop."],
            "medium": "d. MMM yyyy HH:mm:ss",
            "short": "d. MM. yy HH:mm",
            "fullDate": "EEEE, dd. MMMM y",
            "longDate": "dd. MMMM y",
            "mediumDate": "d. MMM yyyy",
            "shortDate": "d. MM. yy",
            "mediumTime": "HH:mm:ss",
            "shortTime": "HH:mm"
        },
        "id": "sl-si"
    });
}]);
angular.module("ngLocale", [], ["$provide", function ($provide) {
    var PLURAL_CATEGORY = {ZERO: "zero", ONE: "one", TWO: "two", FEW: "few", MANY: "many", OTHER: "other"};
    $provide.value("$locale", {
        "NUMBER_FORMATS": {
            "DECIMAL_SEP": ".",
            "GROUP_SEP": ",",
            "PATTERNS": [{
                "minInt": 1,
                "minFrac": 0,
                "macFrac": 0,
                "posPre": "",
                "posSuf": "",
                "negPre": "-",
                "negSuf": "",
                "gSize": 2,
                "lgSize": 3,
                "maxFrac": 3
            }, {
                "minInt": 1,
                "minFrac": 2,
                "macFrac": 0,
                "posPre": "",
                "posSuf": "\u00A4",
                "negPre": "-",
                "negSuf": "\u00A4",
                "gSize": 2,
                "lgSize": 3,
                "maxFrac": 2
            }],
            "CURRENCY_SYM": "Rs"
        },
        "pluralCat": function (n) {
            if (n == 1) {
                return PLURAL_CATEGORY.ONE;
            }
            return PLURAL_CATEGORY.OTHER;
        },
        "DATETIME_FORMATS": {
            "MONTH": ["ജനുവരി", "ഫെബ്രുവരി", "മാര്‍ച്ച്", "ഏപ്രില്‍", "മേയ്", "ജൂണ്‍", "ജൂലൈ", "ആഗസ്റ്റ്", "സെപ്റ്റംബര്‍", "ഒക്ടോബര്‍", "നവംബര്‍", "ഡിസംബര്‍"],
            "SHORTMONTH": ["ജനു", "ഫെബ്രു", "മാര്‍", "ഏപ്രി", "മേയ്", "ജൂണ്‍", "ജൂലൈ", "ഓഗ", "സെപ്റ്റം", "ഒക്ടോ", "നവം", "ഡിസം"],
            "DAY": ["ഞായറാഴ്ച", "തിങ്കളാഴ്ച", "ചൊവ്വാഴ്ച", "ബുധനാഴ്ച", "വ്യാഴാഴ്ച", "വെള്ളിയാഴ്ച", "ശനിയാഴ്ച"],
            "SHORTDAY": ["ഞായര്‍", "തിങ്കള്‍", "ചൊവ്വ", "ബുധന്‍", "വ്യാഴം", "വെള്ളി", "ശനി"],
            "AMPMS": ["രാവിലെ", "വൈകുന്നേരം"],
            "medium": "y, MMM d h:mm:ss a",
            "short": "dd/MM/yy h:mm a",
            "fullDate": "y, MMMM d, EEEE",
            "longDate": "y, MMMM d",
            "mediumDate": "y, MMM d",
            "shortDate": "dd/MM/yy",
            "mediumTime": "h:mm:ss a",
            "shortTime": "h:mm a"
        },
        "id": "ml-in"
    });
}]);
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
            "CURRENCY_SYM": "₫"
        },
        "pluralCat": function (n) {
            return PLURAL_CATEGORY.OTHER;
        },
        "DATETIME_FORMATS": {
            "MONTH": ["tháng một", "tháng hai", "tháng ba", "tháng tư", "tháng năm", "tháng sáu", "tháng bảy", "tháng tám", "tháng chín", "tháng mười", "tháng mười một", "tháng mười hai"],
            "SHORTMONTH": ["thg 1", "thg 2", "thg 3", "thg 4", "thg 5", "thg 6", "thg 7", "thg 8", "thg 9", "thg 10", "thg 11", "thg 12"],
            "DAY": ["Chủ nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"],
            "SHORTDAY": ["CN", "Th 2", "Th 3", "Th 4", "Th 5", "Th 6", "Th 7"],
            "AMPMS": ["SA", "CH"],
            "medium": "dd-MM-yyyy HH:mm:ss",
            "short": "dd/MM/yyyy HH:mm",
            "fullDate": "EEEE, 'ngày' dd MMMM 'năm' y",
            "longDate": "'Ngày' dd 'tháng' M 'năm' y",
            "mediumDate": "dd-MM-yyyy",
            "shortDate": "dd/MM/yyyy",
            "mediumTime": "HH:mm:ss",
            "shortTime": "HH:mm"
        },
        "id": "vi-vn"
    });
}]);
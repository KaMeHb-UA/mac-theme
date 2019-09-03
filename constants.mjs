export const

    darkDockOnly = 'NSRequiresAquaSystemAppearance',
    theme = 'AppleInterfaceStyle',
    accent = 'AppleAccentColor',

    themeColors = Symbol(),

    accentMap = {
        [-1]: {
            0: '999999',
            1: '999999',
            [themeColors]: {
                0: {
                    closeBtn: [ '8e8e93', '8d8d92' ],
                    minimizeBtn: [ '8e8e93', '8d8d92' ],
                    maximizeBtn: [ '8e8e93', '8d8d92' ],
                },
                1: {
                    closeBtn: [ '9f9fa4', '9a9a9f' ],
                    minimizeBtn: [ '9f9fa4', '9a9a9f' ],
                    maximizeBtn: [ '9f9fa4', '9a9a9f' ],
                }
            }
        },
        0: [ 'dc382f', 'f64035' ],
        1: [ 'fd8000', 'ff9000' ],
        2: [ 'e0aa00', 'fabe00' ],
        3: [ '35ad21', '3cc025' ],
        4: [ '145fce', '1769e7' ],
        5: [ '933992', 'a441a3' ],
        6: [ 'c63572', 'de3c7f' ],
    },

    themeColorsMap = {
        0: {
            heading: [ '353535', '414141' ],
            headingButtons: [ '656565', '6c6c6c'],
            headingColor: 'b7b8b9',
            inactiveHeadingColor: '7e7f80',
            selectButtons: [ '656565', '656565' ],
            radioCheckButtons: [ '6c6c6c', '515151' ],
            appBg: [ '2e2e2e', '323232' ],
            closeBtn: [ 'fc4f51', 'fc4b4e' ],
            minimizeBtn: [ 'fec532', 'febe30' ],
            maximizeBtn: [ '38d544', '36cd40' ],
            borders: [ 'afafaf', 'cfcfcf', 'd5d5d5', 'aaa' ],
        },
        1: {
            heading: [ 'd0d0d0', 'e5e5e5' ],
            headingButtons: [ 'f1f1f1', 'fff'],
            // need to change
            headingColor: 'b7b8b9',
            inactiveHeadingColor: '7e7f80',
            //
            selectButtons: [ 'fff', 'fff' ],
            radioCheckButtons: [ 'fff', 'fff' ],
            appBg: [ 'ececec', 'ececec' ],
            closeBtn: [ 'fd5857', 'fd5858' ],
            minimizeBtn: [ 'fec12e', 'febe30' ],
            maximizeBtn: [ '34d13e', '36cd40' ],
            borders: [ 'fff0', 'ffffff0f', '464646', '000' ],
        },
    },

function color(color){
    return '#' + color
}

function gradient(start, stop, type){
    return Object.assign([ color(start), color(stop) ], {
        _gradientType: type
    })
}

function linearGradient(start, stop){
    return gradient(start, stop, 'linear')
}

function circleGradient(start, stop){
    return gradient(start, stop, 'circle')
}

export const

    darkDockOnly = 'NSRequiresAquaSystemAppearance',
    theme = 'AppleInterfaceStyle',
    accent = 'AppleAccentColor',

    themeColors = Symbol(),

    accentMap = {
        [-1]: Object.assign(color('999999'), {
            [themeColors]: {
                0: {
                    closeBtn: circleGradient('8e8e93', '8d8d92'),
                    minimizeBtn: circleGradient('8e8e93', '8d8d92'),
                    maximizeBtn: circleGradient('8e8e93', '8d8d92'),
                },
                1: {
                    closeBtn: circleGradient('9f9fa4', '9a9a9f'),
                    minimizeBtn: circleGradient('9f9fa4', '9a9a9f'),
                    maximizeBtn: circleGradient('9f9fa4', '9a9a9f'),
                }
            }
        }),
        0: linearGradient('dc382f', 'f64035'),
        1: linearGradient('fd8000', 'ff9000'),
        2: linearGradient('e0aa00', 'fabe00'),
        3: linearGradient('35ad21', '3cc025'),
        4: linearGradient('145fce', '1769e7'),
        5: linearGradient('933992', 'a441a3'),
        6: linearGradient('c63572', 'de3c7f'),
    },

    themeColorsMap = {
        0: {
            heading: linearGradient('353535', '414141'),
            headingButtons: linearGradient('656565', '6c6c6c'),
            headingColor: color('b7b8b9'),
            inactiveHeadingColor: color('7e7f80'),
            selectButtons: color('656565'),
            radioCheckButtons: linearGradient('6c6c6c', '515151'),
            appBg: linearGradient('2e2e2e', '323232'),
            closeBtn: linearGradient('fc4f51', 'fc4b4e'),
            minimizeBtn: linearGradient('fec532', 'febe30'),
            maximizeBtn: linearGradient('38d544', '36cd40'),
            outerBorders: linearGradient('afafaf', 'cfcfcf'),
            innerBorders: linearGradient('d5d5d5', 'aaa'),
        },
        1: {
            heading: linearGradient('d0d0d0', 'e5e5e5'),
            headingButtons: linearGradient('f1f1f1', 'fff'),
            // need to change
            headingColor: color('b7b8b9'),
            inactiveHeadingColor: color('7e7f80'),
            //
            selectButtons: linearGradient('fff', 'fff'),
            radioCheckButtons: linearGradient('fff', 'fff'),
            appBg: linearGradient('ececec', 'ececec'),
            closeBtn: linearGradient('fd5857', 'fd5858'),
            minimizeBtn: linearGradient('fec12e', 'febe30'),
            maximizeBtn: linearGradient('34d13e', '36cd40'),
            outerBorders: linearGradient('fff0', 'ffffff0f'),
            innerBorders: linearGradient('464646', '000'),
        },
    };

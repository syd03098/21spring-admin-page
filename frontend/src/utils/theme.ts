const colors = {
    black100: `#000000`,
    black80: `#232527`,
    black60: `#444444`,
    black40: `#636363`,
    black30: `#777777`,

    smoke100: `#bfbfbf`,
    smoke80: `#e0e0e0`,
    smoke50: `#f3f3f4`,
    smoke30: `#f6f6f7`,
    smoke1: `#fafafa`,
    white: `#ffffff`,

    primary100: `#4276c9`,
    primary50: `#4285f4`,
    skyblue: `#009ee3`,
    green: `#19aa6a`,
    yellow: `#ffc134`,
    red: `#cd392d`,
    pink: `#ed4c6b`,
};

const displaySize = {
    mobile: 799,
    desktop: 800,
};

const responsive = {
    mobile: `(max-width: ${displaySize.mobile}px)`,
    desktop: `(min-width: ${displaySize.desktop}px)`,
};

export default {
    ...colors,
    ...responsive,
};

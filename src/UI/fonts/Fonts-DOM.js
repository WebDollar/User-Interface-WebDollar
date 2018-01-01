var CSSId = "cssFont"+Math.floor(Math.random()*100000);
var CSS = "<style id='"+CSSId+"'>"+require('./res/fonts.css')+"</style>";

let svgs = {
    "key": require('./res/svg-key.svg'),
    "lock-closed":require('./res/svg-lock-closed.svg'),
    "lock-open": require('./res/svg-lock-open.svg'),
    "plus": require('./res/svg-plus.svg'),
    "plus-square": require('./res/svg-plus-square.svg'),
    "x": require('./res/svg-x.svg'),
};

class FontsDOM{

    constructor(){


    }

    addCSS(style){
        if (document.getElementById(CSSId) !== null) return false;

        let parent = document.getElementsByTagName("head")[0];

        parent.insertAdjacentHTML( 'beforeend',CSS);
    }

    addHTML(parent, icon, newId){

        if (typeof parent === "string")
            parent = document.getElementById(parent);

        let iconFound;
        for (const key in svgs)
            if (svgs.hasOwnProperty(key))
                if (key === icon)
                    iconFound = svgs[key];

        iconFound = iconFound.replace("<svg",`<svg id="${newId}" `);

        if (iconFound )
            parent.insertAdjacentHTML( 'beforeend', iconFound);

    }

}

export default new FontsDOM();
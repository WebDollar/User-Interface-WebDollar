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
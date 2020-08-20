const createCollection = selectorCollection => {
    selectorCollection.each = (callback) => {
        //handling of looping through HTML nodes and manipulating nodes
        //####ONLY THE forEach METHOD IS AVAILABLE ON THE HTML NODES
        selectorCollection.forEach((el, i )=> {
            const bindedFn = callback.bind(el, i);
            bindedFn(i, el);
        });
    }

    selectorCollection.on = (eventTitle, eventHandler) => {
        //handling the binding of event listeners
        selectorCollection.forEach(el => {
            el.addEventListener(eventTitle, eventHandler);
        });
    }

    selectorCollection.css = (...cssArgs) => {
        //handling the css functionality for one style changed for one node typ
        if(typeof cssArgs[0] === 'string'){
            const [property, value] = cssArgs;
            selectorCollection.forEach(el=> {
                el.style[property] = value;
            });
        }else if(typeof cssArgs[0] === 'object'){
            //handling the case where multiple css parameters are changed for each element selector
            const styleProperties =  Object.entries(cssArgs[0]);
            
            selectorCollection.forEach(el => {
            styleProperties.forEach(([property, value])=> {
                    el.style[property] = value;
                });
            });
            
        }
    }
}



const $ = (...args) => {
    if(typeof args[0] === 'function'){
        //recreating the document ready functionality
      const readyState = args[0];
      document.addEventListener('DOMContentLoaded', readyState);
    }else if(typeof args[0] === 'string'){
        //in nazQuery all of the string arguments work as selectors
        const selector = args[0];
        const selectorCollection = document.querySelectorAll(selector);
        createCollection(selectorCollection);

        return selectorCollection;
    } else if(args[0] instanceof HTMLElement){
        const selectedCollection = [args[0]];
        createCollection(selectorCollection);
        return selectedCollection;
    }
}
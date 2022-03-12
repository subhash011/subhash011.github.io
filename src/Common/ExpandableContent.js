import React, {useEffect, useRef, useState} from "react";
import {useWindowSize} from "../utils";
import {animated, useSpring} from "react-spring";
import {Button} from "primereact/button";

const ExpandableContent = ({item}) => {
    const [openItem, setOpenItem] = useState(null);
    const windowSize = useWindowSize();
    const ref = useRef(null);
    const [style, animateStyle] = useSpring(() => ({
        height: '0px'
    }), []);

    useEffect(() => {
        animateStyle.start({
            height: (openItem ? ref.current.offsetHeight + openItem.additionalHeight : 0) + 'px',
        });
    }, [ref, openItem, animateStyle, windowSize]);

    useEffect(() => {
        if (item.expanded) {
            setOpenItem(item);
        }
    }, [item]);

    return (
        <React.Fragment>
            {item.extra && <div style={{height: '100%'}}>
                <animated.div style={{overflow: "hidden", ...style}}>
                    <div ref={ref}>
                        {item.extraContent}
                    </div>
                </animated.div>
            </div>}
            {item.extra && <div>
                    <span className="w-full flex justify-content-end">
                        <Button label={`See ${openItem ? 'less' : 'more'}`} className="p-button-text"
                                onClick={() => {
                                    setOpenItem(!openItem ? item : 0);
                                }}/>
                    </span>
            </div>}
        </React.Fragment>
    )
}
export {ExpandableContent};
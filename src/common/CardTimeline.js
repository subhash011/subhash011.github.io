import React, {useEffect, useRef, useState} from "react";
import {Timeline} from "primereact/timeline";
import '../styles/_common.scss';
import {useWindowSize} from "../utils";
import {animated, useSpring} from "react-spring";
import {Button} from "primereact/button";
import {Card} from "primereact/card";

const ExtraContent = ({item}) => {
    const [openItem, setOpenItem] = useState(item.expanded ? item : null);
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

const cardContent = (item) => {
    return (
        <Card className="flex text-left max-w-full">
            <h4 className="mb-2">{item.title}</h4>
            <span className="text-600">{item.subTitle}</span>
            <p>{item.date}</p>
            <p>{item.description}</p>
            <ExtraContent item={item}/>
        </Card>
    );
};

function CardTimeLine(props) {

    const dummyItem = [{
        id: 0,
        title: '',
        subTitle: '',
        date: '',
        description: ''
    }];

    let {value} = props;
    value = [...dummyItem, ...value];

    const customizedMarker = (item, index) => {
        return (
            <span className="custom-marker p-shadow-2"
                  style={{color: 'var(--surface-ground)', backgroundColor: 'var(--primary-color)'}}>
                <i className={index%2===0 ? "pi pi-angle-double-right" : "pi pi-angle-double-left"}/>
            </span>
        );
    };

    return <div className="card-timeline">
        <Timeline {...props} content={(item) => cardContent(item, props.extraContent)} value={value}
                  marker={customizedMarker} className="customized-timeline"/>
    </div>
}

export {
    CardTimeLine,
    ExtraContent
};
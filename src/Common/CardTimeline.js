import React from "react";
import {Timeline} from "primereact/timeline";
import '../styles/_common.scss';
import {Card} from "primereact/card";
import { ExpandableContent } from "./ExpandableContent";

const cardContent = (item) => {
    return (
        <Card className="flex text-left max-w-full">
            <h4 className="mb-2 font-italic">{item.title}</h4>
            <span className="text-600">{item.subTitle}</span>
            <p>{item.date}</p>
            <p>{item.description}</p>
            <ExpandableContent item={item}/>
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

    return (
        <div className="card-timeline">
            <Timeline {...props} content={(item) => cardContent(item, props.extraContent)} value={value}
                      marker={customizedMarker} className="customized-timeline"/>
        </div>
    );
}

export {
    CardTimeLine
};
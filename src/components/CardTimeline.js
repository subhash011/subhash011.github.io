import {Card} from "primereact/card";
import {Timeline} from "primereact/timeline";
import React from "react";
import styled from "styled-components";
import {ExpandableContent} from "./ExpandableContent";

const CardTimelineWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;

  .p-timeline-event-content,
  .p-timeline-event-opposite {
    line-height: 1;
  }

  .p-timeline-event {
    padding: 2rem 0 2rem 0;
  }

  .p-timeline-event-connector {
    position: absolute;
    height: 100%;
  }

  .p-card-body {
    width: 100%;
    padding-top: 0;
  }

  .p-card-content {
    padding-top: 0;
    padding-bottom: 0;
  }

  .p-card-title {
    display: none;
  }

  .p-card-subtitle {
    display: none;
  }
`;

const CustomizedTimelineWrapper = styled(Timeline)`
  max-width: 80%;

  .p-timeline-event:nth-child(1) {
    display: none;
  }

  @media screen and (max-width: 1200px) {
    max-width: 90%;
  }
  @media screen and (max-width: 960px) {
    .p-timeline-event:nth-child(even) {
      flex-direction: row !important;
    }

    .p-timeline-event:nth-child(even) .p-timeline-event-content {
      text-align: left !important;
    }

    .p-timeline-event-opposite,
    .p-timeline-event-separator {
      display: none;
    }

    .p-timeline-event-content {
      padding: 0 !important;
    }
  }
`;

const CustomMarker = styled.div`
  display: flex;
  width: 2rem;
  height: 2rem;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  border-radius: 50%;
  z-index: 1;
`;

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
            <CustomMarker className="p-shadow-2"
                          style={{color: 'var(--surface-ground)', backgroundColor: 'var(--primary-color)'}}>
                <i className={index % 2 === 0 ? "pi pi-angle-double-right" : "pi pi-angle-double-left"}/>
            </CustomMarker>
        );
    };

    return (
        <CardTimelineWrapper>
            <CustomizedTimelineWrapper {...props} content={(item) => cardContent(item, props.extraContent)}
                                       value={value}
                                       marker={customizedMarker}/>
        </CardTimelineWrapper>
    );
}

export {
    CardTimeLine
};
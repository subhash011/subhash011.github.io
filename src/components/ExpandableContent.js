import {Button} from "primereact/button";
import React, {useState} from "react";
import useCollapse from "react-collapsed";

const ExpandableContent = ({item}) => {
    const [openItem, setOpenItem] = useState(item.expanded ? item : null);
    const {getCollapseProps, getToggleProps} = useCollapse({
        defaultExpanded: true,
        isExpanded: !!openItem
    })

    return (
        <React.Fragment>
            {item.extra && <div className="pt-2" {...getCollapseProps()}>
                {item.extraContent}
            </div>}
            {item.extra && <div className="pt-2">
                    <span className="w-full flex justify-content-end">
                        <Button {...getToggleProps()} label={`See ${openItem ? 'less' : 'more'}`}
                                className="p-button-text"
                                onClick={() => {
                                    setOpenItem(!!!openItem ? item : null);
                                }}/>
                    </span>
            </div>}
        </React.Fragment>
    )
}
export {ExpandableContent};
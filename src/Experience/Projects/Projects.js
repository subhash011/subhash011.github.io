import {DataView} from "primereact/dataview";
import projectsData from "../../Data/projects.json";
import {Card} from "primereact/card";
import {Image} from "primereact/image";
import "../../styles/_projects.scss"
import {Tooltip} from "primereact/tooltip";
import {Tag} from "primereact/tag";
import React from "react";
import {Dialog} from "primereact/dialog";
import {Button} from "primereact/button";
import {SectionHeading} from "../../Common/SectionHeading";

function MyProjects() {

    const [dialogVisible, setDialogVisible] = React.useState(null);

    const title = (item) => {
        return (
            <span className="flex justify-content-center">
                <Tooltip target=".item-title" position="top"/>
                <h5 data-pr-tooltip={item.title}
                    className="mt-0 item-title white-space-nowrap overflow-hidden text-overflow-ellipsis">{item.title}</h5>
            </span>
        );
    }

    const extraContent = (item) => {
        if (!!!item) return null;
        return (
            <React.Fragment>
                <ul className="work-done" style={{paddingLeft: '20px'}}>
                    {item.workDone.map((work, index) => {
                        return (
                            <li key={index}>
                                {work}
                            </li>
                        )
                    })}
                </ul>
                <div className="flex align-items-center justify-content-center flex-wrap mt-4">
                    {item.techStack.map((tag, index) => {
                        return (
                            <Tag key={index} className="mr-2 mb-2" value={tag}/>
                        )
                    })}
                </div>
            </React.Fragment>
        );
    }

    const itemCard = (item) => {
        return (
            <Card id={item.id} title={title(item)} className="w-full h-full" style={{maxWidth: '30rem'}}>
                <div className="flex justify-content-center mb-4">
                    <Image src={require(`../../assets/${item.image}`)} alt="Image" className="flex justify-content-center"
                           imageStyle={{ width: '100%', height: '200px', objectFit: 'cover', objectPosition: '50% 50%' }}/>
                </div>
                <div className="flex h-5rem justify-content-center text-center font-italic font-bold">{item.description}</div>
                <div className="flex justify-content-center mt-4 mr-4">
                    {item.gitHub && <i onClick={() => window.open(item.gitHub, "_blank")}
                                       className="pi pi-github ml-auto cursor-pointer"/>}
                    {item.site && <i onClick={() => window.open(item.site, "_blank")}
                                     className="pi pi-external-link ml-3 cursor-pointer"/>}
                    {item.youtube && <i onClick={() => window.open(item.youtube, "_blank")}
                                        className="pi pi-youtube ml-3 cursor-pointer"/>}
                </div>
                {item.extra && <div className="flex justify-content-end mt-3">
                    <Button label="See more" className="p-button-text"
                            onClick={() => {
                                setDialogVisible(item);
                            }}/>
                </div>}
            </Card>
        );
    }

    const dialogItemCard = (item, children) => {
        return (
            <Card id={item.id} title={title(item)} className="w-full h-full">
                <div className="flex justify-content-center mb-4">
                    <Image src={require(`../../assets/${item.image}`)} alt="Image" className="flex justify-content-center"
                           imageStyle={{ width: '100%', height: '200px', objectFit: 'cover', objectPosition: '50% 50%' }}/>
                </div>
                <div className="flex justify-content-center text-center font-italic font-bold">{item.description}</div>
                {children}
            </Card>
        );
    }

    const renderGridItem = (item) => {
        if (!!!item) return null;
        return (
            <div className="flex justify-content-center p-4 col-12 md:col-6 xl:col-4">
                {itemCard(item)}
            </div>
        )
    }

    const renderDialogItem = (item) => {
        if (!!!item) return null;
        return (
            <div className="flex justify-content-center">
                {dialogItemCard(item, extraContent(item))}
            </div>
        )
    }

    return (
        <section id="projects" className="pt-7">
            <div className="flex flex-column justify-content-center align-items-center">
                <SectionHeading name={"projects"} heading="My Projects"/>
                <Dialog className="item-dialog max-h-screen" visible={!!dialogVisible} onHide={() => setDialogVisible(null)}
                        breakpoints={{'960px': '75vw', '640px': '100vw'}} contentClassName="h-full ">
                    {renderDialogItem(dialogVisible, extraContent(dialogVisible))}
                </Dialog>
                <DataView className="projects-dataview" value={projectsData}
                          itemTemplate={renderGridItem}
                          layout="grid"/>
            </div>
        </section>
    );
}

export default MyProjects;
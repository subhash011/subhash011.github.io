import {Menubar} from 'primereact/menubar';
import '../styles/_topbar.scss';
import {HashLink} from "react-router-hash-link";
import {Button} from "primereact/button";
import {Tooltip} from "primereact/tooltip";
import React from "react";

function TopBar({theme, toggleTheme, isLoading}) {

    const template = (item, options) => {
        return (
            <HashLink smooth to={`${item.url}`} role="menuitem" className={options.className} target={item.target}
                      onClick={options.onClick}>
                <span className={options.iconClassName}/>
                <span className="p-menuitem-text">{item.label}</span>
            </HashLink>
        );
    }

    const items = [
        {
            label: 'Home',
            icon: 'pi pi-fw pi-home',
            url: '#',
            template: template
        },
        {
            label: 'Work',
            icon: 'pi pi-fw pi-briefcase',
            items: [
                {
                    label: 'Projects',
                    url: '#projects',
                    template: template
                },
                {
                    label: 'Experience',
                    url: '#experience',
                    template: template
                }
            ]
        },
        {
            label: 'Skills',
            icon: 'pi pi-fw pi-bolt',
            url: '#skills',
            template: template
        },
        {
            label: 'Contact',
            icon: 'pi pi-fw pi-phone',
            url: '#contact',
            template: template
        },
        {
            label: 'Resume',
            icon: 'pi pi-fw pi-download',
            template: (item, options) => {

                return (
                    <React.Fragment>
                        <div role="menuitem" id="resume-download" className={options.className} onClick={() => {
                            window.open(`/Subhash's Resume.pdf`, "_blank");
                        }}>
                            <span className={options.iconClassName}/>
                            <span className="p-menuitem-text">{item.label}</span>
                        </div>
                    </React.Fragment>
                );
            }
        }
    ];

    const ThemeSwitchButton = (props) => {
        if (props.theme === 'light') {
            return <i className="pi pi-moon"/>
        }
        return <i className="pi pi-sun"/>

    };

    return (
        <div className="p-grid">
            <Tooltip target=".theme-switcher" position="right"/>
            <div className="p-col-12">
                <Menubar className="app-menubar" model={items} end={
                    <Button name="theme-switcher"
                            disabled={isLoading}
                            data-pr-tooltip={theme === 'light' ? 'Switch to Dark Theme' : 'Switch to Light Theme'}
                            icon={<ThemeSwitchButton theme={theme}/>}
                            onClick={toggleTheme}
                            className="theme-switcher p-button-rounded p-button-text"/>
                }/>
            </div>
        </div>
    );
}

export default TopBar;
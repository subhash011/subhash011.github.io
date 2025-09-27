import {Button} from "primereact/button";
import {Menubar} from 'primereact/menubar';
import {classNames} from "primereact/utils";
import React, {useCallback, useContext, useState} from "react";
import {HashLink} from "react-router-hash-link";
import styled from "styled-components";
import {ThemeContext} from "../Context";

const FixedMenubar = styled(Menubar)`
  background-color: var(--surface-ground);
  border: none;
  border-radius: 0 0 12px 12px;
  flex-direction: row-reverse;
  position: fixed;
  padding-right: 8px;
  width: 100%;
  z-index: 999;
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  .p-menuitem-text, .p-menuitem-icon, .p-submenu-icon {
    color: var(--text-color) !important;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  }
  
  .p-menubar-end {
    margin-right: auto;
    margin-left: 0;
  }
  
  .p-menuitem-link {
    border-radius: 8px !important;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
    margin: 0 2px !important;
    padding: 0.75rem 1rem !important;
    position: relative !important;
    overflow: hidden !important;
  }
  
  .p-menuitem-link:hover {
    transform: translateY(-2px) !important;
    background-color: rgba(136, 60, 174, 0.1) !important;
    color: var(--primary-color) !important;
    box-shadow: 0 8px 25px -8px rgba(0, 0, 0, 0.3) !important;
  }
  
  .p-menuitem-link:hover .p-menuitem-text,
  .p-menuitem-link:hover .p-menuitem-icon {
    color: var(--primary-color) !important;
    transform: scale(1.05) !important;
  }
`;

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
                label: 'Experience',
                url: '#experience',
                template: template
            },
            {
                label: 'Projects',
                url: '#projects',
                template: template
            }
        ]
    },
    {
        label: 'Education',
        icon: 'pi pi-fw pi-book',
        url: '#education',
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
        icon: 'pi pi-fw pi-file-pdf',
        template: (item, options) => {

            return (
                <React.Fragment>
                    <div role="menuitem" id="resume-download" className={options.className} onClick={() => {
                        window.open(`https://drive.google.com/file/d/16qt9AqoXdDaiuZOf_x34hWtQv4x2VGJD/view?usp=sharing`, "_blank");
                    }}>
                        <span className={options.iconClassName}/>
                        <span className="p-menuitem-text">{item.label}</span>
                    </div>
                </React.Fragment>
            );
        }
    }
];

function TopBar() {

    const [theme, setTheme] = useContext(ThemeContext);
    const [isThemeSwitching, setIsThemeSwitching] = useState(false);

    const toggleTheme = useCallback(() => {
        setIsThemeSwitching(true);
        const newTheme = theme === 'light' ? 'dark' : 'light';
        const elementId = 'theme-link';
        const linkElement = document.getElementById('theme-link');
        const cloneLinkElement = linkElement.cloneNode(true);
        const newThemeUrl = linkElement.getAttribute('href').replace(theme, newTheme);
        cloneLinkElement.setAttribute('id', elementId + '-clone');
        cloneLinkElement.setAttribute('href', newThemeUrl);
        cloneLinkElement.addEventListener('load', () => {
            linkElement.remove();
            cloneLinkElement.setAttribute('id', elementId);
            localStorage.setItem('theme', newTheme);
            setIsThemeSwitching(false);
            setTheme(newTheme);
        });
        linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);
    }, [setTheme, theme]);

    return (
        <div className="p-grid">
            <div className="p-col-12">
                <FixedMenubar model={items} end={
                    <Button name="theme-switcher"
                            disabled={isThemeSwitching}
                            icon={<i className={classNames('pi', theme === 'dark' ? 'pi-sun' : 'pi-moon')}/>}
                            onClick={toggleTheme}
                            className="p-button-rounded p-button-text"/>
                }/>
            </div>
        </div>
    );
}

export default TopBar;
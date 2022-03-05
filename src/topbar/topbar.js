import {Menubar} from 'primereact/menubar';
import {faMoon, faSun} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Button} from "primereact/button";
import '../styles/_topbar.scss';
import {HashLink} from "react-router-hash-link";


function TopBar(props) {

    const template = (item, options) => {
        return (
            <HashLink smooth to={`${item.url}`} role="menuitem" className={options.className} target={item.target} onClick={options.onClick}>
                <span className={options.iconClassName} />
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
            label: 'Experience',
            icon: 'pi pi-fw pi-history',
            items: [
                {
                    label: 'Projects',
                    url: '#projects',
                    template: template
                },
                {
                    label: 'Industry',
                    url: '#industry',
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
        }
    ];

    const ThemeSwitchButton = (props) => {
        if (props.theme === 'light') {
            return <FontAwesomeIcon icon={faMoon}/>
        }
        return <FontAwesomeIcon icon={faSun}/>
    };

    return (
        <div className="p-grid fixed">
            <div className="p-col-12">
                <Menubar model={items} end={
                    <Button icon={<ThemeSwitchButton theme={props.theme}/>}
                            onClick={props.toggleTheme}
                            className="p-button-rounded p-button-text"/>
                }/>
            </div>
        </div>
    );
}

export default TopBar;
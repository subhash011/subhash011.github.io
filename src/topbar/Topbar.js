import {Menubar} from 'primereact/menubar';
import {faMoon, faSun} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import '../styles/_topbar.scss';
import {HashLink} from "react-router-hash-link";
import {Button} from "primereact/button";

function TopBar(props) {

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
            label: 'Experience',
            icon: 'pi pi-fw pi-briefcase',
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
        },
        {
            label: 'Resume',
            icon: 'pi pi-fw pi-download',
            template: (item, options) => {
                return (
                    <div role="menuitem" className={options.className} onClick={downloadResume}>
                        <span className={options.iconClassName}/>
                        <span className="p-menuitem-text">{item.label}</span>
                    </div>
                );
            }
        }
    ];

    const ThemeSwitchButton = (props) => {
        if (props.theme === 'light') {
            return <FontAwesomeIcon icon={faSun}/>
        }
        return <FontAwesomeIcon icon={faMoon}/>

    };

    const downloadResume = () => {
        fetch(`${process.env.PUBLIC_URL}/assets/functional.pdf`)
            .then(res => res.blob())
            .then(blob => {
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = 'Subhash\'s resume.pdf';
                document.body.appendChild(a);
                a.click();
                window.URL.revokeObjectURL(url);
            });
    }

    return (
        <div className="p-grid">
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
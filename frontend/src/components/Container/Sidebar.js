import { Fragment } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'

import { menuHierarchy } from './menuHierarchy'

const handleArrowClick = (e) => {
    const arrowParent = e.currentTarget.parentElement.parentElement;
    
    // toggle didn't work when there's another toggle in li.nav-links element's onClick
    if(arrowParent.classList.contains('show-submenu')) { // TRASH CODE .. should be handled with REACT !!
        arrowParent.classList.add('show-submenu') // counter-intuitive .. temporary code
    } else {
        arrowParent.classList.remove('show-submenu')
    }
};

const MenuBlock = ({ multiple, label, icon, importedIcon, Icon }) => {

    return (
        <Fragment>
            <div className="menu-item">
                {
                    importedIcon ? 
                    <Icon /> :
                    <i className={`bx ${icon}`}></i>
                }
                <span className="link_name">{label}</span>
            </div>
            {
                multiple ? (
                    <i
                        className="bx bxs-chevron-up arrow"
                        onClick={handleArrowClick}
                    />
                ) : null
            }
        </Fragment>
    )
}

const SubMenuBlock = ({ setShowMenu, submenus, multiple, label }) => {
    const navigate = useNavigate()
    return (
        <ul className={`sub-menu ${multiple ? "" : "blank"}`}>
            <Fragment>
                {
                    multiple ?
                        <li>
                            <span className="link_name">{label}</span>
                        </li> : null
                }
                {submenus.map((subMenu, index) => (
                    (subMenu.path.split("/").length > 2 && !subMenu.display) ?
                    null :
                    <li key={index}>
                        <NavLink
                            style={{ textDecoration: 'none' }}
                            to={subMenu.path}
                            onClick={(e) => {
                                e.preventDefault()
                                setShowMenu(false)
                                navigate(subMenu.path)
                            }}
                            className={multiple || index !== 0 ? "" : "link_name"}
                        >
                            {subMenu.label}
                        </NavLink>
                    </li>
                ))}
            </Fragment>
        </ul>
    )
}

const Sidebar = ({ showMenu, setShowMenu }) => {
    const navigate = useNavigate();
    return (
        <div className={`sidebar ${showMenu ? "" : "close"}`}>
            <ul className="nav-links">
                {menuHierarchy.map((menu, index) => (
                    <li key={index} onClick={(e) => {
                        if(menu.children.length > 1) {
                            if(showMenu) {
                                e.currentTarget.classList.toggle("show-submenu")
                            }
                        }
                        else {
                            navigate(menu.children[0].path)
                            setShowMenu(false)
                        }
                    }}>
                        {menu.children.length > 1 ?
                            <Fragment>
                                <div className="icon-link">
                                    <MenuBlock
                                        multiple={true}
                                        label={menu.label}
                                        icon={menu.icon}
                                        importedIcon={menu.importedIcon}
                                        Icon={menu.Icon}
                                        // showMenu={showMenu}
                                    />
                                </div>
                                <SubMenuBlock
                                    setShowMenu={setShowMenu}
                                    submenus={menu.children}
                                    multiple={true}
                                    label={menu.label}
                                />
                            </Fragment>
                            :
                            <Fragment>
                                <MenuBlock
                                    multiple={false}
                                    label={menu.label}
                                    icon={menu.icon}
                                    importedIcon={menu.importedIcon}
                                    Icon={menu.Icon}
                                />
                                <SubMenuBlock
                                    setShowMenu={setShowMenu}
                                    submenus={menu.children}
                                    multiple={false}
                                />
                            </Fragment>
                        }
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Sidebar
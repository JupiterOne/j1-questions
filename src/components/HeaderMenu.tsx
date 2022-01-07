import React from "react";
import { useHeaderStyles } from "../classes";
import { Link } from "react-router-dom";
const HeaderMenu = () => {
  const classes = useHeaderStyles();
  const menuItem = [
    {title: "Community", url: "/",type: "link",isActive: false},
    {title: "Questions Library", url: "/",type: "link", isActive: true},
    {title: "Documentation", url: "/",type: "link",isActive: false},
    {title: "Blog", url: "/",type: "link",isActive: false},
    {title: "Events", url: "/",type: "link",isActive: false},
    {title: "Swag", url: "/",type: "link",isActive: false},
    {title: "Divider", type: "divider",isActive: false},
    {title: "Github", url: "/",type: "button",isActive: false},
    {title: "Slack", url: "/",type: "button",isActive: false},
    {title: "JupiterOne", url: "/",type: "button",isActive: false},
  ]
  return (
    <div className="ask-j1-header_menu">
      {menuItem.map(link =>
                 { 
                 const linkColor = link.isActive ? '#8C9EFF': 'white'; 
                return ( 
                <div className="menu-item"  >
                    {link.type === "divider" ? <div className="divider"></div> :
                <Link className={classes.homeLink} to="/" style={{ textDecoration: 'none', color: linkColor }}>
                    {link.title}
                  </Link>}
                  { link.type === "button" ?
                  <img alt="open-in-new-tab" src="https://info.jupiterone.com/hubfs/open_in_new_24px.svg"></img> : ''
                }
                  </div>
                )
    }  
  )}
    </div>
  );
};
export default HeaderMenu;
import React from "react";
import { useHeaderStyles } from "../classes";
const HeaderMenu = () => {
  const classes = useHeaderStyles();
  const menuItem = [
    {title: "Community", url: "https://community.askj1.com",type: "link",isActive: false},
    {title: "Questions Library", url: "https://ask.us.jupiterone.io/",type: "link", isActive: true},
    {title: "Docs", url: "https://community.askj1.com/kb/docs",type: "link",isActive: false},
    {title: "Blog", url: "https://try.jupiterone.com/",type: "link",isActive: false},
    {title: "Events", url: "https://try.jupiterone.com/events",type: "link",isActive: false},
    {title: "Swag", url: "/",type: "link",isActive: false},
    {title: "Divider", type: "divider",isActive: false},
    {title: "Github", url: "https://github.com/JupiterOne",type: "button",isActive: false},
    {title: "Slack", url: "https://join.slack.com/t/jupiterone-community/shared_invite/zt-9b0a2htx-m8PmSWMbkjqCzF2dIZiabw",type: "button",isActive: false},
    {title: "JupiterOne", url: "https://jupiterone.com/",type: "button",isActive: false},
  ]
  return (
    <div className="ask-j1-header_menu">
      {menuItem.map(link =>
                 { 
                 const linkColor = link.isActive ? '#8C9EFF': 'white'; 
                 const to = link.url
                return ( 
                <div className="menu-item"  >
                    {link.type === "divider" ? <div className="divider"></div> :
                <a className={classes.homeLink} href={to} style={{ textDecoration: 'none', color: linkColor }}>
                    {link.title}
                  </a>}
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

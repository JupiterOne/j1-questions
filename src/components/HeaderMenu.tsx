import React from "react";
import { useHeaderStyles } from "../classes";
import { Link } from "react-router-dom";
const HeaderMenu = () => {
  const classes = useHeaderStyles();
  const menuItem = [
    {title: "Community", url: "/",type: "link"},
    {title: "Question Library", url: "/",type: "link"},
    {title: "Documentation", url: "/",type: "link"},
    {title: "Blog", url: "/",type: "link"},
    {title: "Events", url: "/",type: "link"},
    {title: "Swag", url: "/",type: "link"},
    {title: "Divider", type: "divider"},
    {title: "Github", url: "/",type: "button"},
    {title: "Slack", url: "/",type: "button"},
    {title: "JupiterOne", url: "/",type: "button"},
  ]
  return (
    <div className="ask-j1-header_menu">
      {menuItem.map(link =>
                  <div className="menu-item"  >
                    {link.type === "divider" ? <div className="divider"></div> :
                <Link className={classes.homeLink} to="/" style={{ textDecoration: 'none' }}>
                    {link.title}
                  </Link>}
                  { link.type === "button" ?
                  <img alt="open-in-new-tab" src="https://info.jupiterone.com/hubfs/open_in_new_24px.svg"></img> : ''
                }
                  </div>
                )}
    </div>
  );
};
export default HeaderMenu;
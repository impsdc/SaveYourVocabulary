import React from "react";
import HomeIcon from "../icons/HomeIcon";
import HomeOutlineIcon from "../icons/HomeOutlineIcon";
import SearchIcon from "../icons/SearchIcon";
import SearchOutlineIcon from "../icons/SearchOutlineIcon";
import UserIcon from "../icons/UsersIcon";
import UserOutlineIcon from "../icons/UsersOutlineIcon";
import LogOut from "../icons/LogoutIcon";
import { Flex } from "reflexbox";
import SEO from "../components/Helmet";
import styled from "styled-components";
import { DANGER } from "../constants/style";
import { Link, useLocation, useHistory } from "react-router-dom";
import { connect } from "react-redux";
import {LogoutUser } from "../_redux/actions/UserActions"
import { SetError, ClearError } from "../_redux/actions/UiActions"

interface NavLink {
  icon: JSX.Element;
  value: string;
  link: string;
  activeIcon: JSX.Element;
}

const links: NavLink[] = [
  {
    icon: <HomeIcon stroke={"white"} fill={"transparent"} />,
    value: "Home",
    link: "/",
    activeIcon: <HomeOutlineIcon stroke={"white"} fill={"white"} />,
  },

  {
    icon: (
      <SearchOutlineIcon stroke-with={"10px"} stroke={"white"} fill={"white"} />
    ),
    value: "Search",
    link: "/search",
    activeIcon: (
      <SearchIcon stroke-with={"20px"} stroke={"white"} fill={"white"} />
    ),
  },

  {
    icon: <UserIcon stroke={"white"} fill={"transparent"} />,
    value: "Account",
    link: "/account",
    activeIcon: <UserOutlineIcon stroke={"white"} fill={"white"} />,
  },

  {
    icon: <LogOut stroke={DANGER} />,
    value: "Log Out",
    link: "/logout",
    activeIcon: <LogOut stroke={DANGER} />,
  },
];

const MobileLink = styled(Flex)`
  cursor: pointer;
  align-items: center;
  width: auto;
  font-size: 1.2rem;
  border-radius: 9px;
  transition: all 0.2s;
  user-select: none;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.99);
  }

  svg {
    min-width: 28px;
  }
`;

interface IProps {
  [x: string]: any;
  search?:JSX.Element
  children?: JSX.Element[] | JSX.Element 
};

const Layout: React.FC<IProps> = (props:IProps) => {
  
  const location = useLocation();
  const history = useHistory();

  return (
    <div>
      <SEO title={'SaveYourVocabulary app'} description={'made by impsdc.fr'} />
      <Flex>
        {props.search}
      </Flex>
      <Flex my={2} mx={4}>
        {props.children}
      </Flex>
      <Flex
        justifyContent="center"
        alignItems="center"
        mt={10}
        px={10}
        width="100%"
        style={{
          position: "fixed",
          zIndex: 999,
          bottom: 25,
          border: "2px solid transparent",
        }}
      >
        <Flex width={links.length * 65}>
          <Flex
            flex={1}
            backgroundColor="rgba(49, 50, 56, 0.9)"
            height={50}
            style={{
              borderRadius: 12,
              boxShadow: "0 2px 20px 0 rgb(37, 38, 44, 80%)",
            }}
          >
            <Flex
              px={20}
              alignItems="center"
              flex={1}
              style={{
                borderRadius: 12,
                backdropFilter: "blur(10px)",
              }}
              justifyContent="space-between"
            >
              {links.map((link, index) => {
                const active = location.pathname === link.link;
                return (
                  <span  key={index}>
                    {link.link === "/logout" ? 
                      <span onClick={() => props.LogoutUser(history)}>
                       <MobileLink>
                         {active ? link.activeIcon : link.icon}
                       </MobileLink>
                     </span>
                     :
                     <Link to={link.link}>
                      <MobileLink>
                        {active ? link.activeIcon : link.icon}
                      </MobileLink>
                   </Link>
                    }
                  </span>
                );
              })}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  user: state.user,
  UI: state.UI,
});

const mapActionsToProps = {
  LogoutUser,
  SetError,
  ClearError,
};
export default connect(mapStateToProps, mapActionsToProps)(Layout);
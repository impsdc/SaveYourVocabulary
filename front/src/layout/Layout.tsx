import React, {useEffect} from "react";
import HomeIcon from "../icons/HomeIcon";
import HomeOutlineIcon from "../icons/HomeOutlineIcon";
import SearchIcon from "../icons/SearchIcon";
import SearchOutlineIcon from "../icons/SearchOutlineIcon";
import UserIcon from "../icons/UsersIcon";
import UserOutlineIcon from "../icons/UsersOutlineIcon";
import LogOut from "../icons/LogoutIcon";
import { Flex, Box } from "reflexbox";
import SEO from "../components/Helmet";
import styled from "styled-components"
import {DANGER} from "../constants/style"
import { CheckAuthentication } from '../_helpers/CheckAuthentication';
import {useLocation} from "react-router-dom"

interface NavLink {
  icon: JSX.Element;
  value: string;
  link: string;
  activeIcon: JSX.Element;
}

interface Props {
  search?: string;
  title?:string;
  description?:string;
}

const links: NavLink[] = [
  {
    icon: <HomeIcon stroke={"white"} fill={"transparent"}/>,
    value: "Home",
    link: "/",
    activeIcon: <HomeOutlineIcon stroke={"white"} fill={'white'}/>,
  },

  {
    icon: <SearchOutlineIcon stroke-with={"10px"} stroke={"white"} fill={"white"}/>,
    value: "Search",
    link: "/search",
    activeIcon:  <SearchIcon stroke-with={"20px"} stroke={"white"} fill={"white"}/>,
  },

  {
    icon: <UserIcon stroke={"white"} fill={"transparent"}/>,
    value: "Account",
    link: "/account",
    activeIcon: <UserOutlineIcon stroke={"white"} fill={'white'}/>,
  },

  {
    icon: <LogOut stroke={DANGER}/>,
    value: "Log Out",
    link: "/logout",
    activeIcon: <LogOut stroke={DANGER}/>,
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

const Layout:React.FC<Props> = (props:Props) => {

  useEffect(() => {
    CheckAuthentication();
  });

  const location = useLocation();

  return (
    <SEO  title={props.title!}
          description={props.description!}
    >
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
                      <a href={link.link}>
                        <MobileLink>
                          {active ? link.activeIcon : link.icon}
                        </MobileLink>
                      </a>
                    );
                  })}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </SEO>
  );
};

export default Layout;

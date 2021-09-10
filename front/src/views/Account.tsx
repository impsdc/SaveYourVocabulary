import React from "react";
import Layout from "../layout/Layout";
import  {useDarkMode} from "../components/ThemeMode"
import Switcher from "../components/Switcher";
import { Flex } from "reflexbox";

const Account = () => {
  const [theme, themeToggler, mountedComponent] = useDarkMode();

  const isDark = (theme:any) : boolean => theme === 'dark' ? true : false

  return (
    <Layout>
      <Flex>
        <span>Dark mode</span>
        <Switcher active={isDark(theme)} onChange={themeToggler} />
      </Flex>
    </Layout>
  )
};

export default Account;

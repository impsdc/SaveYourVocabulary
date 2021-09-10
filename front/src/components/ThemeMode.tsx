import { useEffect, useState } from 'react';
export const useDarkMode = () => {
    const [theme, setTheme] = useState<string>('light');
    const [mountedComponent, setMountedComponent] = useState<boolean>(false)

    const setMode = (mode:any) => {
        window.localStorage.setItem('theme', mode)
        setTheme(mode)
    };
    
    const themeToggler = ():void => {
        console.log("olo")
        theme === 'light' ? setMode('dark') : setMode('light')
    };

    useEffect(() => {
        const localTheme = window.localStorage.getItem('SaveYourVocabulary');
        localTheme ? setTheme(localTheme) : setMode('light')
        setMountedComponent(true)
    }, []);
    
    return [theme, themeToggler, mountedComponent]
};
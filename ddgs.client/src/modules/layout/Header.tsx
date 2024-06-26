import {ReactElement} from 'react';
import {styled} from 'styled-components';
import {ActionIcon, useMantineColorScheme, Center} from '@mantine/core';
import {IconSunFilled, IconMoonFilled} from '@tabler/icons-react';
import DataGridLoader from '../data-grid/DataGridLoader';
import Logo from '../../../public/ddgs-logo.svg?react';

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const StyledLogoContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
`;

const DarkThemeLogoText = styled.h1`
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 36px;
`;

const LightThemeLogoText = styled.h1`
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 36px;
    color: var(--mantine-color-dark-6);
`;

export function Header(): ReactElement {
    const {colorScheme, toggleColorScheme} = useMantineColorScheme();
    const isDarkTheme = colorScheme === 'dark';

    return (
        <HeaderContainer>
            <StyledLogoContainer>
                <Logo style={{height: '48px', width: '48px', color: 'teal'}}/>
                {isDarkTheme && <DarkThemeLogoText>DDGS</DarkThemeLogoText>}
                {!isDarkTheme && <LightThemeLogoText>DDGS</LightThemeLogoText>}
            </StyledLogoContainer>
            <div style={{display: 'flex', gap: '4px'}}>
                <DataGridLoader isDarkTheme={isDarkTheme}/>
                <Center>
                    <ActionIcon
                        variant='subtle'
                        size='lg'
                        color={isDarkTheme ? 'yellow' : 'blue'}
                        onClick={() => toggleColorScheme()}
                        title='Toggle color scheme'>
                        {isDarkTheme ? (
                            <IconSunFilled style={{width: '80%', height: '80%'}}/>
                        ) : (
                            <IconMoonFilled style={{width: '80%', height: '80%'}}/>
                        )}
                    </ActionIcon>
                </Center>
            </div>
        </HeaderContainer>
    );
}

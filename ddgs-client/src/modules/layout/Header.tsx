import { ReactElement } from 'react';
import { styled } from 'styled-components';
import { ActionIcon, useMantineColorScheme, Center } from '@mantine/core';
import { IconSunFilled, IconMoonFilled } from '@tabler/icons-react';
import DataGridLoader from '../data-grid/DataGridLoader';

const HeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const StyledLogo = styled.h1`
    font-size: 22px;
`;

export function Header(): ReactElement {
    const { colorScheme, toggleColorScheme } = useMantineColorScheme();
    const isDarkTheme = colorScheme === 'dark';

    return (
        <HeaderContainer>
            <StyledLogo>DDGS</StyledLogo>
            <div style={{ display: 'flex', gap: '4px' }}>
                <DataGridLoader isDarkTheme={isDarkTheme} />
                <Center>
                    <ActionIcon
                        variant='subtle'
                        size='lg'
                        color={isDarkTheme ? 'yellow' : 'blue'}
                        onClick={() => toggleColorScheme()}
                        title='Toggle color scheme'>
                        {isDarkTheme ? (
                            <IconSunFilled style={{ width: '70%', height: '70%' }} />
                        ) : (
                            <IconMoonFilled style={{ width: '70%', height: '70%' }} />
                        )}
                    </ActionIcon>
                </Center>
            </div>
        </HeaderContainer>
    );
}

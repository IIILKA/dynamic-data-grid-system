import { ReactElement } from 'react';
import { styled } from 'styled-components';
import { ActionIcon, useMantineColorScheme } from '@mantine/core';
import { IconSunFilled, IconMoonFilled } from '@tabler/icons-react';

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
    const dark = colorScheme === 'dark';

    return (
        <HeaderContainer>
            <StyledLogo>DDGS</StyledLogo>
            <div style={{ display: 'flex', gap: '4px' }}>
                <ActionIcon
                    variant='subtle'
                    size='lg'
                    color={dark ? 'yellow' : 'blue'}
                    onClick={() => toggleColorScheme()}
                    title='Toggle color scheme'>
                    {dark ? (
                        <IconSunFilled style={{ width: '70%', height: '70%' }} />
                    ) : (
                        <IconMoonFilled style={{ width: '70%', height: '70%' }} />
                    )}
                </ActionIcon>
            </div>
        </HeaderContainer>
    );
}

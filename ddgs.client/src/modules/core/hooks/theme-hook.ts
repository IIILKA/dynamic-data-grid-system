import { useMantineColorScheme } from '@mantine/core';

const useTheme = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const isDarkTheme = colorScheme === 'dark';

  return { isDarkTheme, toggleColorScheme };
};

export default useTheme;

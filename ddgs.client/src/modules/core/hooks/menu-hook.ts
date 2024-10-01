import { useClickOutside } from '@mantine/hooks';
import { ForwardedRef, SetStateAction, useImperativeHandle, useState } from 'react';

type MenuProps = {
  isOpened: boolean;
  offsetX?: number;
  offsetY?: number;
};

export type MenuRef = {
  setMenu(value: SetStateAction<MenuProps>): void;
};

export function useMenu(ref: ForwardedRef<MenuRef>) {
  const [menu, setMenu] = useState<MenuProps>({
    isOpened: false
  });

  const menuRef = useClickOutside(() => setMenu({ isOpened: false }));

  useImperativeHandle<MenuRef, MenuRef>(ref, () => ({ setMenu }));

  return { menu, menuRef, setMenu };
}

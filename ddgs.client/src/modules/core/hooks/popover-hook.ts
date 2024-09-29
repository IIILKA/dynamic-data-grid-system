import { useClickOutside } from '@mantine/hooks';
import { ForwardedRef, SetStateAction, useImperativeHandle, useState } from 'react';

type PopoverProps = {
  isOpened: boolean;
};

export type PopoverRef = {
  setPopover(value: SetStateAction<PopoverProps>): void;
};

export function usePopover(ref: ForwardedRef<PopoverRef>) {
  const [popover, setPopover] = useState<PopoverProps>({
    isOpened: false
  });

  const popoverRef = useClickOutside(() => setPopover({ isOpened: false }));

  useImperativeHandle<PopoverRef, PopoverRef>(ref, () => ({ setPopover }));

  return { popover, popoverRef, setPopover };
}

import { useAppDispatch, useAppSelector } from '../../../app/hooks.ts';
import { removeError, selectErrors } from '../error-slice.ts';

export default function useErrorNotification() {
  const dispatch = useAppDispatch();
  const errors = useAppSelector(selectErrors);

  const handleClose = (errorId: number) => {
    dispatch(removeError(errorId));
  };

  return { errors, handleClose };
}

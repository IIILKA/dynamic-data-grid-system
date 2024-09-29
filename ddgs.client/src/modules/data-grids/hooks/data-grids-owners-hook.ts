import { useEffect, useState } from 'react';
import { getUserInfoAsync } from '../../auth/auth-service.ts';
import UserInfoModel from '../../auth/models/user-info-model.ts';

export default function useDataGridsOwners() {
  const [userInfo, setUserInfo] = useState<UserInfoModel>();

  useEffect(() => {
    const loadUserInfo = async () => {
      setUserInfo(await getUserInfoAsync());
    };

    loadUserInfo();
  }, []);

  return { userInfo };
}

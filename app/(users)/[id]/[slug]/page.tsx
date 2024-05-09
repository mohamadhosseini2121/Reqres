import React, {FC} from 'react';
import Image from 'next/image';
import {userApi} from '@/services/userApiService';
import UserSinglePage from '@/components/page/UserSingle';
type props = {
  params: {id: string; slug: string};
};
const page: FC<props> = async (props) => {
  //   const user = await userApi().getById(Number(props.params.id));
  //   console.log('user: ', user);

  return <UserSinglePage id={Number(props.params.id)} />;
};
export default page;

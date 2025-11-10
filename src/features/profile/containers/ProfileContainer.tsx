import React from 'react';
import {UserService} from '@services';
import {transformData} from '@services';
import useProfile from '../hooks/useProfile';
import ProfileScreen from '../screens/ProfileScreen';
import {useFirestorePaginationRealtime} from '@shared/hooks';

const userService = new UserService();

const ProfileContainer = () => {
  const {user} = useProfile();

  // Example usage of useFirestorePaginationRealtime hook
  const listUsers = useFirestorePaginationRealtime({
    query: userService.listUsersQuery(),
    pageSize: 10,
    referenceFields: ['companyId', 'communityId'],
    transformData: transformData,
  });

  const {data, error, loading, loadMore, hasMore} = listUsers;

  console.log(data);

  return <ProfileScreen user={user} />;
};

export default ProfileContainer;

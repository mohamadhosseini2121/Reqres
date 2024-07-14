'use client';
import {user_filter_model, user_model} from '@/models';
import {userApi} from '@/services/userApiService';
import React, {FC, useEffect, useState} from 'react';
import {Button, Container, Pagination, Spinner} from 'react-bootstrap';
import UsersList from './components/UsersList';
import {toast} from 'react-toastify';
import UserCreateModal from '@/components/global/Modals/UserCreateModal';
import {useAppDispatch, useAppSelector} from '@/lib/hooks';
import {getUsersFromServer, getUsersState} from '@/lib/features/users/UserSlice';

type props = {};
const UserPage: FC<props> = (props) => {
  const {error, isLoading, userList} = useAppSelector(getUsersState);
  const dispatch = useAppDispatch();
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    fetchData({per_page: 6, page: currentPage});
  }, []);

  async function fetchData(filters: Partial<user_filter_model>) {
    const response = await dispatch(getUsersFromServer(filters));
    if (response?.total_pages) {
      setTotalPages(response.total_pages);
    }
  }

  function changePageHandler(newPage: number) {
    if (newPage === currentPage) return;
    setCurrentPage(newPage);
    fetchData({per_page: 6, page: newPage});
  }

  return (
    <main>
      <Container className='py-5'>
        <div className='d-flex gap-3 justify-content-center py-4'>
          <Button
            variant='primary'
            onClick={() => fetchData({per_page: 6, page: currentPage})}
            disabled={isLoading}
          >
            {isLoading ? <>Please wait...</> : <>Reload</>}
          </Button>
          <UserCreateModal>
            <Button variant='success' disabled={isLoading}>
              {isLoading ? <>Please wait...</> : <>Create new user</>}
            </Button>
          </UserCreateModal>
        </div>

        {isLoading && (
          <div className='text-center my-5'>
            <Spinner animation='border' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </Spinner>
            <p className='mt-3'>Please wait...</p>
          </div>
        )}

        {!isLoading && error.length > 0 && <p className='text-center text-danger py-4'>{error}</p>}
        {!isLoading && !error && <UsersList users_list={userList} />}

        <div className='d-flex justify-content-center mt-5'>
          <Pagination size='lg'>
            {Array(totalPages)
              .fill(0)
              .map((_, index) => {
                return (
                  <Pagination.Item
                    disabled={isLoading}
                    key={index}
                    active={index + 1 === currentPage}
                    onClick={() => changePageHandler(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                );
              })}
          </Pagination>
        </div>
      </Container>
    </main>
  );
};
export default UserPage;

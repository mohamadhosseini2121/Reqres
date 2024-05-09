'use client';
import {user_filter_model, user_model} from '@/models';
import {userApi} from '@/services/allServices';
import React, {FC, useEffect, useState} from 'react';
import {Button, Container, Pagination, Spinner} from 'react-bootstrap';
import UsersList from './components/UsersList';
import {toast} from 'react-toastify';
import UserCreateModal from '@/components/global/Modals/UserCreateModal';

type props = {};
const UserPage: FC<props> = (props) => {
  const DEFAULT_USER_LIST_FILTERS = {
    page: 1,
    per_page: 6,
  };
  const [loading, setLoading] = useState<boolean>(false);
  const [usersList, setUsersList] = useState<user_model[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [userFetchFilters, setUserFetchFilters] =
    useState<Partial<user_filter_model>>(DEFAULT_USER_LIST_FILTERS);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData();
  }, [userFetchFilters]);

  async function fetchData() {
    setLoading(true);
    try {
      const response = await userApi().getList(userFetchFilters);
      setUsersList(response.data);
      setTotalPages(response.total_pages);
    } catch (e) {
      toast(`There is a problem with getting data`, {
        autoClose: 2500,
        type: 'error',
      });
    }
    setLoading(false);
  }

  function changePageHandler(newPage: number) {
    if (newPage === userFetchFilters.page) return;

    setUserFetchFilters({
      ...userFetchFilters,
      page: newPage,
    });
  }

  return (
    <main>
      <Container className='py-5'>
        <div className='d-flex gap-3 justify-content-center py-4'>
          <Button
            variant='primary'
            onClick={() => setUserFetchFilters(DEFAULT_USER_LIST_FILTERS)}
            disabled={loading}
          >
            {loading ? <>Please wait...</> : <>Reload</>}
          </Button>
          <UserCreateModal>
            <Button variant='success' disabled={loading}>
              {loading ? <>Please wait...</> : <>Create new user</>}
            </Button>
          </UserCreateModal>
        </div>

        {loading ? (
          <div className='text-center my-5'>
            <Spinner animation='border' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </Spinner>
            <p className='mt-3'>Please wait...</p>
          </div>
        ) : (
          <UsersList users_list={usersList} />
        )}

        <div className='d-flex justify-content-center mt-5'>
          <Pagination size='lg'>
            {Array(totalPages)
              .fill(0)
              .map((_, index) => {
                return (
                  <Pagination.Item
                    disabled={loading}
                    key={index}
                    active={index + 1 === userFetchFilters.page}
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

'use client';
import React, {FC, useEffect, useState} from 'react';
import Image from 'next/image';
import {user_model} from '@/models';
import {toast} from 'react-toastify';
import {userApi} from '@/services/userApiService';
import Spinner from 'react-bootstrap/Spinner';
import Link from 'next/link';
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import {useRouter} from 'next/navigation';
import {useAppDispatch} from '@/lib/hooks';
import {updateUsersList} from '@/lib/features/users/UserSlice';

type props = {
  id: number;
};
const UserSinglePage: FC<props> = (props) => {
  const dispatch = useAppDispatch();
  const [user, setUser] = useState<user_model | null>(null);
  const [fetchLoading, setFetchLoading] = useState<boolean>(false);
  const [dataChangeLoading, setDataChangeLoading] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setFetchLoading(true);
    try {
      const userResponse = await userApi().getById(props.id);
      if (userResponse.data) {
        setUser(userResponse.data);
      }
    } catch (e) {
      toast(`There is a problem with getting data, Are sure this user exist?`, {
        autoClose: 2500,
        type: 'error',
      });
    }
    setFetchLoading(false);
  }

  async function saveUserHandler(user: user_model) {
    setDataChangeLoading(true);
    try {
      await userApi().save(user);
      const response = await userApi().getList({page: 1, per_page: 6});
      dispatch(updateUsersList(response.data));
      toast(`user "${user.first_name || ''} ${user.last_name || ''}" data saved`, {
        autoClose: 2500,
        type: 'success',
      });
    } catch (e) {
      toast(`There is a problem with saving user data`, {
        autoClose: 2500,
        type: 'error',
      });
    }
    setDataChangeLoading(false);
  }

  async function deleteUserHandler(user: user_model) {
    setDataChangeLoading(true);
    try {
      await userApi().remove(user.id);
      const response = await userApi().getList({page: 1, per_page: 6});
      dispatch(updateUsersList(response.data));
      toast(`user ${user.first_name || ''} ${user.last_name || ''} deleted`, {
        autoClose: 2500,
        type: 'success',
      });
      router.replace('/');
    } catch (e) {
      console.log('error: ', e);
      toast(`There is a problem with deleting user`, {
        autoClose: 2500,
        type: 'error',
      });
    }
    setDataChangeLoading(false);
  }

  return (
    <div className='p-sm-5 p-3'>
      <div className='text-center shadow p-3 rounded'>
        {fetchLoading || !user ? (
          <>
            <Spinner animation='border' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </Spinner>
            <p>please wait...</p>
          </>
        ) : (
          <Container>
            <Row className='justify-content-center'>
              <Col md={3} sm={12}>
                <Link href={user.avatar} target='_blank'>
                  <figure>
                    <Image
                      className='rounded-circle'
                      width={150}
                      height={150}
                      src={user.avatar}
                      alt={`${user.first_name || ''} ${user.last_name || ''}`}
                    />
                  </figure>
                </Link>
              </Col>
              <Col className='text-start' md={6} sm={12}>
                <Form.Group className='mb-3'>
                  <Form.Label htmlFor='FirstNameInput'>First Name: </Form.Label>
                  <Form.Control
                    type='text'
                    id='FirstNameInput'
                    value={user.first_name || ''}
                    onChange={(e) => setUser({...user, first_name: e.target.value})}
                  />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label htmlFor='LastNameInput'>Last Name: </Form.Label>
                  <Form.Control
                    type='text'
                    id='LastNameInput'
                    value={user.last_name || ''}
                    onChange={(e) => setUser({...user, last_name: e.target.value})}
                  />
                </Form.Group>
                <Form.Group className='mb-3'>
                  <Form.Label htmlFor='EmailInput'>Email: </Form.Label>
                  <Form.Control
                    type='text'
                    id='EmailInput'
                    value={user.email || ''}
                    onChange={(e) => setUser({...user, email: e.target.value})}
                  />
                </Form.Group>

                <Button
                  className='me-3'
                  variant='primary'
                  onClick={() => saveUserHandler(user)}
                  disabled={dataChangeLoading}
                >
                  {dataChangeLoading ? <>Please wait...</> : <>Save changes</>}
                </Button>
                <Button
                  variant='danger'
                  onClick={() => deleteUserHandler(user)}
                  disabled={dataChangeLoading}
                >
                  {dataChangeLoading ? <>Please wait...</> : <>Delete user</>}
                </Button>
              </Col>
            </Row>
          </Container>
        )}
      </div>
    </div>
  );
};
export default UserSinglePage;

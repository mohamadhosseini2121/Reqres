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
import {useAppDispatch, useAppSelector} from '@/lib/hooks';
import {
  createUser,
  deleteUser,
  getUserFromServer,
  getUsersFromServer,
  getUsersState,
} from '@/lib/features/users/UserSlice';

type props = {
  id: number;
};
const UserSinglePage: FC<props> = (props) => {
  const dispatch = useAppDispatch();
  const {error, isLoading, userList} = useAppSelector(getUsersState);
  const [user, setUser] = useState<user_model | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    const user = userList.find((item) => item.id === props.id);
    if (user) {
      setUser(user);
    } else {
      const response = await dispatch(getUserFromServer(props.id));
      if (error.length === 0 && response) {
        setUser(response);
      }
    }
  }

  async function saveUserHandler(user: user_model) {
    await dispatch(createUser(user));
    await dispatch(getUsersFromServer({per_page: 6, page: 1}));
    if (!error) {
      toast(`user "${user.first_name || ''} ${user.last_name || ''}" data changed`, {
        autoClose: 2500,
        type: 'success',
      });
    }
  }

  async function deleteUserHandler(user: user_model) {
    await dispatch(deleteUser(user.id));
    await dispatch(getUsersFromServer({per_page: 6, page: 1}));
    if (!error) {
      toast(`user "${user.first_name || ''} ${user.last_name || ''}" deleted`, {
        autoClose: 2500,
        type: 'success',
      });
    }
  }

  return (
    <div className='p-sm-5 p-3'>
      <div className='text-center shadow p-3 rounded'>
        {isLoading && (
          <>
            <Spinner animation='border' role='status'>
              <span className='visually-hidden'>Loading...</span>
            </Spinner>
            <p>please wait...</p>
          </>
        )}
        {!isLoading && error.length > 0 && <p className='py-3 text-center text-danger'>{error}</p>}
        {!isLoading && error.length === 0 && user && (
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
                  disabled={isLoading}
                >
                  {isLoading ? <>Please wait...</> : <>Save changes</>}
                </Button>
                <Button
                  variant='danger'
                  onClick={() => deleteUserHandler(user)}
                  disabled={isLoading}
                >
                  {isLoading ? <>Please wait...</> : <>Delete user</>}
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

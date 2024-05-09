import React, {FC} from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {Col, Row} from 'react-bootstrap';
import {user_model} from '@/models';

type props = {
  users_list: user_model[];
};
const UsersList: FC<props> = ({users_list}) => {
  return (
    <Row className='justify-content-center g-5'>
      {users_list &&
        users_list.map((user) => {
          return (
            <Col lg={4} md={6} sm={12} key={user.id}>
              <Link href={`/${user.id}/${user.first_name}-${user.last_name}`}>
                <div className='text-center shadow p-3 rounded'>
                  <figure>
                    <Image
                      className='rounded-circle'
                      width={150}
                      height={150}
                      src={user.avatar}
                      alt={`${user.first_name || ''} ${user.last_name || ''}`}
                    />
                  </figure>
                  <h5>{`${user.first_name || ''} ${user.last_name || ''}`}</h5>
                  <p>{user.email || ''}</p>
                </div>
              </Link>
            </Col>
          );
        })}
    </Row>
  );
};
export default UsersList;

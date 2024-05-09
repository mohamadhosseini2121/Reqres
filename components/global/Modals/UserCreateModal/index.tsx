import {user_model} from '@/models';
import {userApi} from '@/services/allServices';
import React, {FC, useEffect, useState} from 'react';
import {Form} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {toast} from 'react-toastify';

type props = {
  children: React.ReactNode;
};
const UserCreateModal: FC<props> = ({children}: props) => {
  const [tempUser, setTempUser] = useState<Partial<user_model>>({});
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClose = () => {
    setShow(false);
    setTempUser({});
  };

  const handelSubmit = async () => {
    setLoading(true);
    createUserHandler(tempUser);
    setLoading(false);
  };

  const handleShow = () => setShow(true);

  async function createUserHandler(user: Partial<user_model>) {
    setLoading(true);
    try {
      // do validation
      if (!user.first_name?.trim() && !user.last_name?.trim() && !user.email?.trim())
        throw new Error('all fields are empty. at lease enter one of them');

      const response = await userApi().save(user);
      toast(`user "${user.first_name || ''} ${user.last_name || ''}" created`, {
        autoClose: 2500,
        type: 'success',
      });
      handleClose();
    } catch (e: any) {
      toast(e.message || `There is a problem with saving user data`, {
        autoClose: 2500,
        type: 'error',
      });
    }
    setLoading(false);
  }

  return (
    <>
      <span onClick={handleShow}>{children}</span>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className='mb-3'>
            <Form.Label htmlFor='FirstNameInput'>First Name: </Form.Label>
            <Form.Control
              type='text'
              id='FirstNameInput'
              value={tempUser.first_name || ''}
              onChange={(e) => setTempUser({...tempUser, first_name: e.target.value})}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label htmlFor='LastNameInput'>Last Name: </Form.Label>
            <Form.Control
              type='text'
              id='LastNameInput'
              value={tempUser.last_name || ''}
              onChange={(e) => setTempUser({...tempUser, last_name: e.target.value})}
            />
          </Form.Group>
          <Form.Group className='mb-3'>
            <Form.Label htmlFor='EmailInput'>Email: </Form.Label>
            <Form.Control
              type='text'
              id='EmailInput'
              value={tempUser.email || ''}
              onChange={(e) => setTempUser({...tempUser, email: e.target.value})}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button variant='primary' onClick={handelSubmit} disabled={loading}>
            {loading ? <>Please Wait...</> : <>Create</>}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserCreateModal;

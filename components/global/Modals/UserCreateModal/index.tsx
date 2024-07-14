import {createUser, getUsersFromServer, getUsersState} from '@/lib/features/users/UserSlice';
import {useAppDispatch, useAppSelector} from '@/lib/hooks';
import {user_model} from '@/models';
import React, {FC, useState} from 'react';
import {Form} from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {toast} from 'react-toastify';

type props = {
  children: React.ReactNode;
};
const UserCreateModal: FC<props> = ({children}: props) => {
  const dispatch = useAppDispatch();
  const {error, isLoading} = useAppSelector(getUsersState);

  const [tempUser, setTempUser] = useState<Partial<user_model>>({});
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setTempUser({});
  };

  const handelSubmit = async () => {
    await dispatch(createUser(tempUser));
    await dispatch(getUsersFromServer({per_page: 6, page: 1}));
    if (!error) {
      toast(`user "${tempUser.first_name || ''} ${tempUser.last_name || ''}" created`, {
        autoClose: 2500,
        type: 'success',
      });
      handleClose();
    }
  };

  const handleShow = () => setShow(true);

  return (
    <>
      <span onClick={handleShow}>{children}</span>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error.length > 0 && <p className='py-4 text-center text-danger'>{error}</p>}
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
          <Button variant='primary' onClick={handelSubmit} disabled={isLoading}>
            {isLoading ? <>Please Wait...</> : <>Create</>}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UserCreateModal;

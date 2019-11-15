/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, FormGroup, Input } from 'reactstrap';

const LogInModal = (props) => {

  const [modal, setModal] = useState(true);

  const toggle = () => setModal(!modal)

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>Log In</ModalHeader>
        <ModalBody>
        <form onSubmit = {(e) => {e.preventDefault(); props.logIntoApp(); console.log('submit log in')}}>
        <FormGroup>
        <Input
        type="text"
        placeholder="Username"
        value={props.username}
        onChange={props.handleUsernameChange} />
        <Input
          type="password"
          placeholder="Password"
          value={props.password}
          onChange={props.handlePasswordChange}
        />
        <Button type="submit" color="primary" onClick={toggle}>Submit</Button>{' '}
        <Button color="secondary" onClick={() => {toggle(); props.handleLogInClick()}}>Cancel</Button>
        </FormGroup>
        </form>
        </ModalBody>

      </Modal>
    </div>
  );
}

export default LogInModal;

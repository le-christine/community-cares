/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, FormGroup, Input } from 'reactstrap';

const SignUpModal = (props) => {

  const [modal, setModal] = useState(true);

  const toggle = () => setModal(!modal)

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader>SignUp</ModalHeader>
        <ModalBody>
        <form onSubmit = {(e) => {e.preventDefault(); props.signUp(); props.handleSignUpClick()}}>
        <FormGroup>
        <Input
        type="text"
        placeholder="First name"
        value={props.firstName}
        onChange={props.handleFirstNameChange} />
        <Input
          type="text"
          placeholder="Last name"
          value={props.lastName}
          onChange={props.handleLastNameChange}
        />
        <Input
          type="text"
          placeholder="Email"
          value={props.email}
          onChange={props.handleEmailChange}
        />
        <Input
          type="text"
          placeholder="Username"
          value={props.username}
          onChange={props.handleUsernameChange}
        />
        <Input
          type="password"
          placeholder="Password"
          value={props.password}
          onChange={props.handlePasswordChange}
        />
        <Button type="submit" color="primary" onClick={toggle}>Submit</Button>{' '}
        <Button color="secondary" onClick={() => {toggle(); props.handleSignUpClick()}}>Cancel</Button>
        </FormGroup>
        </form>
        </ModalBody>

      </Modal>
    </div>
  );
}

export default SignUpModal;

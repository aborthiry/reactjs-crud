import React, { Component } from "react";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    FormGroup,
    Label,
    Input,
  } from "reactstrap";

export default class addusers extends Component {
  render() {
    return (
      <div>
        <Button
          className="float-right mb-4"
          color="primary"
          onClick={this.props.toggleNewUserModal}
        >
          Agregar
        </Button>
        <Modal
          isOpen={this.props.newUserModal}
          toggle={this.props.toggleNewUserModal}
        >
          <ModalHeader toggle={this.props.toggleNewUserModal}>
            Add new User
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="nombre">First Name</Label>
              <Input
                id="nombre"
                name="nombre"
                value={this.props.newUserData.nombre}
                onChange={this.props.onChangeAddUserHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label for="apellido">Last Name</Label>
              <Input
                id="apellido"
                name="apellido"
                value={this.props.newUserData.apellido}
                onChange={this.props.onChangeAddUserHandler}
              />
            </FormGroup>

            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                id="email"
                name="email"
                value={this.props.newUserData.email}
                onChange={this.props.onChangeAddUserHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label for="usuario">usuario</Label>
              <Input
                id="usuario"
                name="usuario"
                value={this.props.newUserData.usuario}
                onChange={this.props.onChangeAddUserHandler}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.props.addUser()}>
              Add
            </Button>{" "}
            <Button color="secondary" onClick={this.props.toggleNewUserModal}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
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

export default class editUser extends Component {
  render() {
    return (
      <div>
        <Modal
          isOpen={this.props.editUserModal}
          toggle={this.props.toggleEditUserModal}
        >
          <ModalHeader toggle={this.props.toggleEditUserModal}>
            Update User
          </ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="nombre">Nombre</Label>
              <Input
                id="nombre"
                name="nombre"
                value={this.props.editUserData.nombre}
                onChange={this.props.onChangeEditUserHanler}
              />
            </FormGroup>
            <FormGroup>
              <Label for="apellido">Apellido</Label>
              <Input
                id="apellido"
                name="apellido"
                value={this.props.editUserData.apellido}
                onChange={this.props.onChangeEditUserHanler}
              />
            </FormGroup>

            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                id="email"
                name="email"
                value={this.props.editUserData.email}
                onChange={this.props.onChangeEditUserHanler}
              />
            </FormGroup>
            <FormGroup>
              <Label for="usuario">Usuario</Label>
              <Input
                id="usuario"
                name="usuario"
                value={this.props.editUserData.usuario}
                onChange={this.props.onChangeEditUserHanler}
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button 
              color="primary" 
              onClick={this.props.updateUser}
            >
              Actulizar
            </Button>
            <Button
              color="secondary"
              onClick={this.props.toggleEditUserModal}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
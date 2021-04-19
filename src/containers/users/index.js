import React, { Component } from "react";
import { Table, Button } from "reactstrap";
import axios from "axios";
import AddUser from './addUsers';
import EditUser from './editUsers';

export default class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
          users: [],
          newUserData: {
            nombre: "",
            apellido: "",
            email: "",
            usuario: "",
          },
          isLoading: false,
          status: "",
          newUserModal: false,
          editUserData: {
            id: "",
            nombre: "",
            apellido: "",
            email: "",
            usuario: "",
          },
          editUserModal: false,
          noDataFound: "",
        };
      }

    componentDidMount() {
        this.getUsers();
      }      
    getUsers() {
    axios.get("http://localhost:8000/api/users").then((response) => {
        if (response.status === 200) {        
        this.setState({
            users: response.data ? response.data : [],
        });
        }
        if (
        response.status !== 200
        ) {
        this.setState({
            noDataFound: response.data.message,
        });
        }
    });
    } 

    toggleNewUserModal = () => {
        this.setState({
          newUserModal: !this.state.newUserModal,
        });
      };
    onChangeAddUserHandler = (e) => {
        let { newUserData } = this.state;
        newUserData[e.target.name] = e.target.value;
        this.setState({ newUserData });
    };
    addUser = () => {
        axios
          .post(
            "http://localhost:8000/api/users",
            this.state.newUserData
          )
          .then((response) => {
            const { users } = this.state;
            const newusers = [...users];
            newusers.push(response.data);
            this.setState(
              {
                users: newusers,
                newUserModal: false,
                newUserData: {
                  nombre: "",
                  apellido: "",
                  email: "",
                  usuario: "",
                },
              },
              () => this.getUsers()
            );
          });
      };

      toggleEditUserModal = () => {
        this.setState({
          editUserModal: !this.state.editUserModal,
        });
      };

      onChangeEditUserHanler = (e) => {
        let { editUserData } = this.state;
        editUserData[e.target.name] = e.target.value;
        this.setState({ editUserData });
      };

      editUser = (id, nombre, apellido, email, usuario) => {
        this.setState({
          editUserData: { id, nombre, apellido, email, usuario },
          editUserModal: !this.state.editUserModal,
        });
      };
      
      updateUser = () => {
        let {
          id,
          nombre,
          apellido,
          email,
          usuario,
        } = this.state.editUserData;
        this.setState({
          isLoading: true,
        });
        axios
          .put("http://localhost:8000/api/users/" + id, {
            nombre,
            apellido,
            email,
            usuario,
            id,
          })
          .then((response) => {
            this.getusers();
            this.setState({
              editUserModal: false,
              editUserData: { nombre, apellido, email, usuario },
              isLoading:false,
            });
          })
          .catch((error) => {
            this.setState({isLoading:false})
            console.log(error.response);
          });
      };
    
      deletUser = (id) => {
        this.setState({
          isLoading: true,
        });
        axios
          .delete("http://localhost:8000/api/users/" + id)
          .then((response) => {
            this.setState({
              isLoading: false,
            });
            this.getusers();
          })
          .catch((error) => {
            this.setState({
              isLoading: false,
            });
          });
      };
    
  render() {
    const { newUserData,editUserData,noDataFound,users} = this.state;
      let usersDetails = [];
      if (users.length) {
        usersDetails = users.map((User) => {
          return (
            <tr key={User.id}>
              <td>{User.id}</td>
              <td>{User.nombre}</td>
              <td>{User.apellido}</td>
              <td>{User.email}</td>
              <td>{User.usuario}</td>
              <td>
                <Button
                  color="success"
                  className="mr-3"
                  size="sm"
                  onClick={() =>
                    this.editUser(
                      User.id,
                      User.nombre,
                      User.apellido,
                      User.email,
                      User.usuario
                    )
                  }
                >
                  Editar
                </Button>
                <Button
                  color="danger"
                  size="sm"
                  onClick={() => this.deletUser(User.id)}
                >
                  Eliminar
                </Button>
              </td>
            </tr>
          );
        });
      }
  
      if (this.state.isLoading) {
        return <div className="spinner-border text-center" role="status"> <span className="sr-only">Loading...</span>
      </div>
      } 
    return (
      <div className="App container mt-4">
           <h4 className="font-weight-bold">Usuarios</h4> 
            {/* Model for Add Studnet Record */}
           <AddUser
                toggleNewUserModal={this.toggleNewUserModal}
                newUserModal={this.state.newUserModal}
                onChangeAddUserHandler={this.onChangeAddUserHandler}
                addUser={this.addUser}
                newUserData={newUserData}
          />
         {/* Model for Edit Studnet Record */}
            <EditUser
            toggleEditUserModal={this.toggleEditUserModal}
            editUserModal={this.state.editUserModal}
            onChangeEditUserHanler={this.onChangeEditUserHanler}
            editUser={this.editUser}
            editUserData={editUserData}
            updateUser={this.updateUser}
            />
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Apellido</th>              
              <th>Email</th>
              <th>Usuario</th>
              <th>Acción</th>
            </tr>
          </thead>
          {users.length === 0 ? (
            <tbody>
              <h3>{noDataFound}</h3>
            </tbody>
          ) : (
            <tbody>{usersDetails}</tbody>
          )}
        </Table>
      </div>
    );
  }
}
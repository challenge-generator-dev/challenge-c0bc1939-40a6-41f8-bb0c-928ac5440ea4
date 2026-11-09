import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';

// Tipos definidos según el contrato de la API
interface UserResponseDto {
  id: string;
  name: string;
  email: string;
  birthDate: string;
}

interface CreateUserDto {
  name: string;
  email: string;
  birthDate: string;
}

interface UpdateUserDto {
  name?: string;
  email?: string;
  birthDate?: string;
}

const App = () => {
  const [users, setUsers] = useState<UserResponseDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get<UserResponseDto[]>('/api/users');
        setUsers(response.data);
      } catch (err) {
        setError('Error al cargar los usuarios');
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleCreateUser = async (userData: CreateUserDto) => {
    try {
      const response = await axios.post<UserResponseDto>('/api/users', userData);
      setUsers([...users, response.data]);
    } catch (err) {
      setError('Error al crear el usuario');
      console.error('Error creating user:', err);
    }
  };

  const handleUpdateUser = async (id: string, userData: UpdateUserDto) => {
    try {
      const response = await axios.put<UserResponseDto>(`/api/users/${id}`, userData);
      setUsers(users.map(user => (user.id === id ? response.data : user)));
    } catch (err) {
      setError('Error al actualizar el usuario');
      console.error('Error updating user:', err);
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      await axios.delete(`/api/users/${id}`);
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      setError('Error al eliminar el usuario');
      console.error('Error deleting user:', err);
    }
  };

  if (loading) {
    return <div>Cargando usuarios...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <div className="app">
      <h1>Gestión de Usuarios</h1>
      <Routes>
        <Route
          path="/"
          element=
            <Navigate to="/users" replace />
        />
        <Route
          path="/users"
          element=
            <div>
              <h2>Lista de Usuarios</h2>
              {/* Este componente se implementará en otro lote */}
              {/* <UserList
                users={users}
                onDeleteUser={handleDeleteUser}
              /> */}
              <div className="user-list">
                {users.map(user => (
                  <div key={user.id} className="user-card">
                    <p>Nombre: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Fecha de Nacimiento: {user.birthDate}</p>
                    <button onClick={() => handleDeleteUser(user.id)}>Eliminar</button>
                  </div>
                ))}
              </div>
              <h2>Crear Usuario</h2>
              {/* Este componente se implementará en otro lote */}
              {/* <UserForm onSubmit={handleCreateUser} /> */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  handleCreateUser({
                    name: formData.get('name') as string,
                    email: formData.get('email') as string,
                    birthDate: formData.get('birthDate') as string,
                  });
                }}
              >
                <div>
                  <label htmlFor="name">Nombre:</label>
                  <input type="text" id="name" name="name" required />
                </div>
                <div>
                  <label htmlFor="email">Email:</label>
                  <input type="email" id="email" name="email" required />
                </div>
                <div>
                  <label htmlFor="birthDate">Fecha de Nacimiento:</label>
                  <input type="date" id="birthDate" name="birthDate" required />
                </div>
                <button type="submit">Crear Usuario</button>
              </form>
            </div>
        />
      </Routes>
    </div>
  );
};

export default App;
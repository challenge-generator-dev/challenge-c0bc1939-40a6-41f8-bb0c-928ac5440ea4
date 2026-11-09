import { useState, useEffect } from 'react';
import axios from 'axios';

interface UserResponseDto {
  id: string;
  nombre: string;
  email: string;
  fechaNacimiento: string;
  rol: string;
  activo: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface UserListProps {
  onEdit?: (user: UserResponseDto) => void;
  onDelete?: (id: string) => void;
  refreshTrigger?: number;
}

const API_BASE_URL = 'http://localhost:3000';

export function UserList({ onEdit, onDelete, refreshTrigger = 0 }: UserListProps) {
  const [users, setUsers] = useState<UserResponseDto[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [sortField, setSortField] = useState<keyof UserResponseDto>('nombre');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  useEffect(() => {
    fetchUsers();
  }, [refreshTrigger]);

  const fetchUsers = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get<UserResponseDto[]>(`${API_BASE_URL}/users`, {
        timeout: 10000,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setUsers(response.data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          setError(`Error ${err.response.status}: ${err.response.data?.message || 'Error al obtener usuarios'}`);
        } else if (err.request) {
          setError('No se pudo conectar con el servidor. Verifica que el servidor esté ejecutándose.');
        } else {
          setError('Error al configurar la solicitud');
        }
      } else {
        setError('Error desconocido al obtener usuarios');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (field: keyof UserResponseDto): void => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleDelete = async (id: string): Promise<void> => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      return;
    }
    try {
      await axios.delete(`${API_BASE_URL}/users/${id}`, {
        timeout: 10000,
      });
      setUsers(users.filter((user) => user.id !== id));
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(`Error al eliminar usuario: ${err.response?.data?.message || err.message}`);
      } else {
        setError('Error desconocido al eliminar usuario');
      }
    }
  };

  const filteredUsers = users.filter((user) =>
    user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const aValue = a[sortField] ?? '';
    const bValue = b[sortField] ?? '';
    const comparison = String(aValue).localeCompare(String(bValue));
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <div style={styles.loadingContainer}>
          <div style={styles.spinner}></div>
          <p>Cargando usuarios...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Lista de Usuarios</h2>
        <button onClick={fetchUsers} style={styles.refreshButton}>
          Actualizar
        </button>
      </div>

      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Buscar por nombre o email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.searchInput}
        />
      </div>

      {error && (
        <div style={styles.errorAlert}>
          <span>{error}</span>
          <button onClick={() => setError(null)} style={styles.closeButton}>
            ×
          </button>
        </div>
      )}

      {sortedUsers.length === 0 ? (
        <div style={styles.emptyState}>
          <p>No se encontraron usuarios</p>
        </div>
      ) : (
        <table style={styles.table}>
          <thead>
            <tr>
              <th
                style={styles.th}
                onClick={() => handleSort('nombre')}
                style={{ cursor: 'pointer' }}
              >
                Nombre {sortField === 'nombre' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th
                style={styles.th}
                onClick={() => handleSort('email')}
                style={{ cursor: 'pointer' }}
              >
                Email {sortField === 'email' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th
                style={styles.th}
                onClick={() => handleSort('fechaNacimiento')}
                style={{ cursor: 'pointer' }}
              >
                Fecha de Nacimiento {sortField === 'fechaNacimiento' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th
                style={styles.th}
                onClick={() => handleSort('rol')}
                style={{ cursor: 'pointer' }}
              >
                Rol {sortField === 'rol' && (sortDirection === 'asc' ? '↑' : '↓')}
              </th>
              <th style={styles.th}>Estado</th>
              <th style={styles.th}>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user) => (
              <tr key={user.id} style={styles.tr}>
                <td style={styles.td}>{user.nombre}</td>
                <td style={styles.td}>{user.email}</td>
                <td style={styles.td}>{formatDate(user.fechaNacimiento)}</td>
                <td style={styles.td}>
                  <span style={styles.badge}>{user.rol}</span>
                </td>
                <td style={styles.td}>
                  <span
                    style={{
                      ...styles.statusBadge,
                      backgroundColor: user.activo ? '#dcfce7' : '#fee2e2',
                      color: user.activo ? '#166534' : '#991b1b',
                    }}
                  >
                    {user.activo ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td style={styles.td}>
                  <div style={styles.actionButtons}>
                    {onEdit && (
                      <button
                        onClick={() => onEdit(user)}
                        style={styles.editButton}
                      >
                        Editar
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => handleDelete(user.id)}
                        style={styles.deleteButton}
                      >
                        Eliminar
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div style={styles.footer}>
        <p>Total de usuarios: {sortedUsers.length}</p>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '20px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#1e293b',
  },
  refreshButton: {
    padding: '8px 16px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  searchContainer: {
    marginBottom: '20px',
  },
  searchInput: {
    width: '100%',
    padding: '10px 15px',
    fontSize: '14px',
    border: '1px solid #e2e8f0',
    borderRadius: '6px',
    outline: 'none',
  },
  errorAlert: {
    padding: '12px 16px',
    backgroundColor: '#fee2e2',
    color: '#991b1b',
    borderRadius: '6px',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    color: '#991b1b',
  },
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px',
  },
  spinner: {
    width: '40px',
    height: '40px',
    border: '4px solid #e2e8f0',
    borderTop: '4px solid #2563eb',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    marginBottom: '16px',
  },
  emptyState: {
    textAlign: 'center',
    padding: '40px',
    color: '#64748b',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: 'white',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  },
  th: {
    padding: '12px 16px',
    textAlign: 'left',
    backgroundColor: '#f8fafc',
    fontWeight: '600',
    color: '#475569',
    borderBottom: '2px solid #e2e8f0',
  },
  tr: {
    borderBottom: '1px solid #e2e8f0',
  },
  td: {
    padding: '12px 16px',
    color: '#1e293b',
  },
  badge: {
    padding: '4px 8px',
    backgroundColor: '#e0f2fe',
    color: '#0369a1',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '500',
  },
  statusBadge: {
    padding: '4px 8px',
    borderRadius: '4px',
    fontSize: '12px',
    fontWeight: '500',
  },
  actionButtons: {
    display: 'flex',
    gap: '8px',
  },
  editButton: {
    padding: '6px 12px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
  },
  deleteButton: {
    padding: '6px 12px',
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
  },
  footer: {
    marginTop: '20px',
    textAlign: 'right',
    color: '#64748b',
    fontSize: '14px',
  },
};

export default UserList;
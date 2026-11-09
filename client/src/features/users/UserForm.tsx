import { useState, useEffect, FormEvent } from 'react';
import axios from 'axios';

export interface CreateUserDto {
  nombre: string;
  email: string;
  fechaNacimiento: string;
  rol?: string;
  activo?: boolean;
}

export interface UpdateUserDto {
  nombre?: string;
  email?: string;
  fechaNacimiento?: string;
  rol?: string;
  activo?: boolean;
}

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

interface UserFormProps {
  userToEdit?: UserResponseDto | null;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const API_BASE_URL = 'http://localhost:3000';

type FormMode = 'create' | 'edit';

export function UserForm({ userToEdit, onSuccess, onCancel }: UserFormProps) {
  const [formData, setFormData] = useState<CreateUserDto>({
    nombre: '',
    email: '',
    fechaNacimiento: '',
    rol: 'usuario',
    activo: true,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
  const [mode, setMode] = useState<FormMode>('create');

  useEffect(() => {
    if (userToEdit) {
      setMode('edit');
      setFormData({
        nombre: userToEdit.nombre,
        email: userToEdit.email,
        fechaNacimiento: userToEdit.fechaNacimiento.split('T')[0],
        rol: userToEdit.rol,
        activo: userToEdit.activo,
      });
    } else {
      setMode('create');
      setFormData({
        nombre: '',
        email: '',
        fechaNacimiento: '',
        rol: 'usuario',
        activo: true,
      });
    }
  }, [userToEdit]);

  const validateForm = (): boolean => {
    const errors: { [key: string]: string } = {};

    if (!formData.nombre.trim()) {
      errors.nombre = 'El nombre es requerido';
    } else if (formData.nombre.trim().length < 2) {
      errors.nombre = 'El nombre debe tener al menos 2 caracteres';
    } else if (formData.nombre.trim().length > 100) {
      errors.nombre = 'El nombre no puede exceder 100 caracteres';
    }

    if (!formData.email.trim()) {
      errors.email = 'El email es requerido';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = 'Ingresa un email válido';
      }
    }

    if (!formData.fechaNacimiento) {
      errors.fechaNacimiento = 'La fecha de nacimiento es requerida';
    } else {
      const birthDate = new Date(formData.fechaNacimiento);
      const today = new Date();
      const minDate = new Date();
      minDate.setFullYear(minDate.getFullYear() - 120);
      
      if (birthDate > today) {
        errors.fechaNacimiento = 'La fecha de nacimiento no puede ser futura';
      } else if (birthDate < minDate) {
        errors.fechaNacimiento = 'La fecha de nacimiento no puede ser tan antigua';
      }
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: FormEvent): Promise<void> => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      if (mode === 'create') {
        await axios.post(`${API_BASE_URL}/users`, formData, {
          timeout: 10000,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } else if (userToEdit) {
        await axios.put(`${API_BASE_URL}/users/${userToEdit.id}`, formData, {
          timeout: 10000,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      }

      setFormData({
        nombre: '',
        email: '',
        fechaNacimiento: '',
        rol: 'usuario',
        activo: true,
      });

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          const status = err.response.status;
          if (status === 409) {
            setError('Ya existe un usuario con este email');
          } else if (status === 400) {
            setError(err.response.data?.message || 'Datos inválidos');
          } else if (status === 500) {
            setError('Error del servidor. Intenta más tarde.');
          } else {
            setError(`Error ${status}: ${err.response.data?.message || 'Error desconocido'}`);
          }
        } else if (err.request) {
          setError('No se pudo conectar con el servidor');
        } else {
          setError('Error al configurar la solicitud');
        }
      } else {
        setError('Error desconocido al guardar el usuario');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleReset = (): void => {
    setFormData({
      nombre: '',
      email: '',
      fechaNacimiento: '',
      rol: 'usuario',
      activo: true,
    });
    setValidationErrors({});
    setError(null);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>
          {mode === 'create' ? 'Crear Nuevo Usuario' : 'Editar Usuario'}
        </h2>

        {error && (
          <div style={styles.errorAlert}>
            <span>{error}</span>
            <button onClick={() => setError(null)} style={styles.closeButton}>
              ×
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label htmlFor="nombre" style={styles.label}>
              Nombre completo <span style={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              style={{
                ...styles.input,
                borderColor: validationErrors.nombre ? '#ef4444' : '#e2e8f0',
              }}
              placeholder="Ingresa el nombre completo"
              disabled={loading}
              maxLength={100}
            />
            {validationErrors.nombre && (
              <span style={styles.errorText}>{validationErrors.nombre}</span>
            )}
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.label}>
              Correo electrónico <span style={styles.required}>*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={{
                ...styles.input,
                borderColor: validationErrors.email ? '#ef4444' : '#e2e8f0',
              }}
              placeholder="correo@ejemplo.com"
              disabled={loading}
            />
            {validationErrors.email && (
              <span style={styles.errorText}>{validationErrors.email}</span>
            )}
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="fechaNacimiento" style={styles.label}>
              Fecha de nacimiento <span style={styles.required}>*</span>
            </label>
            <input
              type="date"
              id="fechaNacimiento"
              name="fechaNacimiento"
              value={formData.fechaNacimiento}
              onChange={handleChange}
              style={{
                ...styles.input,
                borderColor: validationErrors.fechaNacimiento ? '#ef4444' : '#e2e8f0',
              }}
              disabled={loading}
            />
            {validationErrors.fechaNacimiento && (
              <span style={styles.errorText}>{validationErrors.fechaNacimiento}</span>
            )}
          </div>

          <div style={styles.formGroup}>
            <label htmlFor="rol" style={styles.label}>
              Rol del usuario
            </label>
            <select
              id="rol"
              name="rol"
              value={formData.rol}
              onChange={handleChange}
              style={styles.select}
              disabled={loading}
            >
              <option value="usuario">Usuario</option>
              <option value="admin">Administrador</option>
              <option value="analista">Analista</option>
              <option value="editor">Editor</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="activo"
                checked={formData.activo}
                onChange={handleChange}
                disabled={loading}
                style={styles.checkbox}
              />
              <span>Usuario activo</span>
            </label>
          </div>

          <div style={styles.buttonGroup}>
            <button
              type="submit"
              style={{
                ...styles.submitButton,
                opacity: loading ? 0.7 : 1,
              }}
              disabled={loading}
            >
              {loading
                ? 'Guardando...'
                : mode === 'create'
                ? 'Crear Usuario'
                : 'Actualizar Usuario'}
            </button>
            <button
              type="button"
              onClick={handleReset}
              style={styles.resetButton}
              disabled={loading}
            >
              Limpiar
            </button>
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                style={styles.cancelButton}
                disabled={loading}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: '12px',
    padding: '32px',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: '24px',
    textAlign: 'center',
  },
  errorAlert: {
    padding: '12px 16px',
    backgroundColor: '#fee2e2',
    color: '#991b1b',
    borderRadius: '8px',
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#991b1b',
    lineHeight: 1,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '6px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#374151',
  },
  required: {
    color: '#ef4444',
  },
  input: {
    padding: '10px 14px',
    fontSize: '14px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    color: '#1e293b',
    backgroundColor: 'white',
  },
  select: {
    padding: '10px 14px',
    fontSize: '14px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    outline: 'none',
    backgroundColor: 'white',
    color: '#1e293b',
    cursor: 'pointer',
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
    fontSize: '14px',
    color: '#374151',
  },
  checkbox: {
    width: '18px',
    height: '18px',
    cursor: 'pointer',
  },
  errorText: {
    fontSize: '12px',
    color: '#ef4444',
  },
  buttonGroup: {
    display: 'flex',
    gap: '12px',
    marginTop: '8px',
  },
  submitButton: {
    flex: 1,
    padding: '12px 24px',
    backgroundColor: '#2563eb',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  resetButton: {
    padding: '12px 24px',
    backgroundColor: '#f1f5f9',
    color: '#475569',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
  cancelButton: {
    padding: '12px 24px',
    backgroundColor: '#fee2e2',
    color: '#991b1b',
    border: '1px solid #fecaca',
    borderRadius: '8px',
    fontSize: '14px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  },
};

export default UserForm;
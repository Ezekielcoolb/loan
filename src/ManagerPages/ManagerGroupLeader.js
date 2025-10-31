import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import {
  addGroupLeader,
  clearGroupLeaderMessages,
  fetchGroupLeaders,
  approveGroupLeader,
  rejectGroupLeader,
  updateGroupLeader,
  deleteGroupLeader,
} from '../redux/slices/groupLeaderSlice';
import { fetchAllTheCsos } from '../redux/slices/csoSlice';

const PageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  

  h2 {
    font-size: 20px;
    font-weight: 600;
    padding: 20px;
  }

  .actions {
    display: flex;
    justify-content: flex-end;
  }

  .open-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 44px;
    padding: 0 20px;
    border-radius: 10px;
    border: none;
    background: #0c1d55;
    color: #ffffff;
    font-weight: 600;
    cursor: pointer;
    font-size: 14px;
  }

  .open-button:disabled {
    background: #98a2b3;
    cursor: not-allowed;
  }

  label {
    display: flex;
    flex-direction: column;
    font-size: 14px;
    font-weight: 500;
    color: #344054;
    gap: 6px;
  }

  input,
  select {
    border: 1px solid #d0d5dd;
    border-radius: 8px;
    height: 40px;
    padding: 0 12px;
    font-size: 14px;
    background: #ffffff;
  }

  .status-message {
    font-size: 14px;
    grid-column: 1 / -1;
  }

  .error {
    color: #d92d20;
  }

  .success {
    color: #039855;
  }
`;

const ControlsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: center;
  justify-content: flex-start;
  padding: 0 20px;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;

  label {
    margin: 0;
  }

  select {
    min-width: 220px;
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  gap: 16px;
  font-size: 14px;
  color: #475467;

  .page-info {
    flex: 1;
    text-align: center;
  }
`;

const PaginationButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 36px;
  padding: 0 16px;
  border-radius: 8px;
  border: 1px solid #d0d5dd;
  background: #ffffff;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s ease, border-color 0.2s ease;

  &:hover:enabled {
    background: #f9fafb;
    border-color: #bfc4ce;
  }

  &:disabled {
    background: #f2f4f7;
    border-color: #eaecf0;
    color: #98a2b3;
    cursor: not-allowed;
  }
`;

const ActionsCell = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ActionToggle = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  border: 1px solid #d0d5dd;
  background: #ffffff;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;

  &:hover {
    background: #f9fafb;
    border-color: #bfc4ce;
  }

  span {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: #475467;
    display: block;
  }

  span + span {
    margin-left: 4px;
  }
`;

const ActionMenu = styled.div`
  position: absolute;
  top: 44px;
  right: 0;
  min-width: 180px;
  background: #ffffff;
  border: 1px solid #e4e7ec;
  border-radius: 12px;
  box-shadow: 0 16px 32px rgba(15, 23, 42, 0.12);
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  z-index: 10;
`;

const ActionMenuButton = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 12px;
  font-size: 14px;
  border: none;
  border-radius: 10px;
  background: ${({ variant }) => {
    if (variant === 'danger') return '#fee4e2';
    if (variant === 'primary') return '#eff4ff';
    return '#f9fafb';
  }};
  color: ${({ variant }) => (variant === 'danger' ? '#b42318' : '#344054')};
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease, transform 0.2s ease;

  &:hover {
    background: ${({ variant }) => {
      if (variant === 'danger') return '#fecdca';
      if (variant === 'primary') return '#dbe3ff';
      return '#eef2f6';
    }};
    transform: translateX(2px);
  }

  &:disabled {
    background: #f2f4f7;
    color: #98a2b3;
    cursor: not-allowed;
    transform: none;
  }
`;

const TableContainer = styled.div`
  background: #ffffff;
  border: 1px solid #e4e7ec;
  border-radius: 12px;
`;

const ScrollContainer = styled.div`
  width: 100%;
  overflow-x: auto;
  padding: 20px;

  &::-webkit-scrollbar {
    height: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #b3b8c2;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #8a91a1;
  }
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: auto;

  thead {
    background: #f9fafb;
  }

  th,
  td {
    padding: 5px;
    text-align: left;
    font-size: 14px;
    border-bottom: 1px solid #e4e7ec;
    color: #344054;
    max-width: 200px;
    
  }

  th {
    font-weight: 600;
    color: #475467;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  @media (max-width: 1024px) {
    th,
    td {
      font-size: 13px;
      padding: 10px;
    }
  }

  @media (max-width: 768px) {
    th,
    td {
      font-size: 12px;
      padding: 8px;
    }
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 24px;
`;

const ModalContent = styled.div`
  width: min(640px, 100%);
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  gap: 24px;
  background: #ffffff;
  border-radius: 16px;
  border: 1px solid #e4e7ec;
  padding: 24px;
  box-shadow: 0 25px 50px -12px rgba(15, 23, 42, 0.25);
`;

const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  h3 {
    font-size: 18px;
    font-weight: 600;
    margin: 0;
  }

  button {
    border: none;
    background: transparent;
    font-size: 20px;
    line-height: 1;
    cursor: pointer;
    color: #344054;
  }
`;

const ModalForm = styled.form`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));

  button {
    grid-column: 1 / -1;
    height: 44px;
    border-radius: 10px;
    border: none;
    background: #0c1d55;
    color: #ffffff;
    font-weight: 600;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    cursor: pointer;
  }

  button:disabled {
    background: #98a2b3;
    cursor: not-allowed;
  }
`;

const initialState = {
  groupName: '',
  firstName: '',
  lastName: '',
  address: '',
  phone: '',
  csoId: '',
  csoName: '',
};

const ManagerGroupLeader = () => {
  const dispatch = useDispatch();
  const { leaders, loading, submitting, error, successMessage, actionLoadingId, pagination } = useSelector(
    (state) => state.groupLeader
  );
  const { list: csos } = useSelector((state) => state.cso);
  const [formData, setFormData] = useState(initialState);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLeaderId, setEditingLeaderId] = useState(null);
  const [openMenuId, setOpenMenuId] = useState(null);
  const [selectedCsoId, setSelectedCsoId] = useState('');
  const menuRefs = useRef({});
  const PAGE_LIMIT = 20;

  const loadGroupLeaders = useCallback(
    (page = 1, csoValue) => {
      const filterValue = typeof csoValue !== 'undefined' ? csoValue : selectedCsoId;
      dispatch(
        fetchGroupLeaders({
          page,
          limit: PAGE_LIMIT,
          csoId: filterValue || undefined,
        })
      );
    },
    [dispatch, selectedCsoId]
  );
  useEffect(() => {
    loadGroupLeaders(1);
    dispatch(fetchAllTheCsos());
  }, [dispatch, loadGroupLeaders]);

  useEffect(() => {
    if (successMessage) {
      setFormData(initialState);
      setIsModalOpen(false);
      setEditingLeaderId(null);
      loadGroupLeaders(pagination?.page || 1);
    }
  }, [successMessage, loadGroupLeaders, pagination?.page]);

  useEffect(() => {
    if (error || successMessage) {
      const timeout = setTimeout(() => {
        dispatch(clearGroupLeaderMessages());
      }, 4000);
      return () => clearTimeout(timeout);
    }
    return undefined;
  }, [dispatch, error, successMessage]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCsoChange = (event) => {
    const { value } = event.target;
    const selectedCso = csos.find((item) => item.workId === value);
    setFormData((prev) => ({
      ...prev,
      csoId: value,
      csoName: selectedCso ? `${selectedCso.firstName} ${selectedCso.lastName}` : '',
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editingLeaderId) {
      dispatch(updateGroupLeader({ id: editingLeaderId, data: formData }));
    } else {
      dispatch(addGroupLeader(formData));
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setEditingLeaderId(null);
    setFormData(initialState);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData(initialState);
    dispatch(clearGroupLeaderMessages());
    setEditingLeaderId(null);
  };

  const handleApprove = (id) => {
    dispatch(approveGroupLeader(id));
    setOpenMenuId(null);
  };

  const handleReject = (id) => {
    dispatch(rejectGroupLeader(id));
    setOpenMenuId(null);
  };

  const handleEdit = (leader) => {
    setEditingLeaderId(leader._id);
    setFormData({
      groupName: leader.groupName || '',
      firstName: leader.firstName || '',
      lastName: leader.lastName || '',
      address: leader.address || '',
      phone: leader.phone || '',
      csoId: leader.csoId || '',
      csoName: leader.csoName || '',
    });
    setIsModalOpen(true);
    setOpenMenuId(null);
  };

  const handleDelete = (id) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this group leader?');
    if (shouldDelete) {
      dispatch(deleteGroupLeader(id));
    }
    setOpenMenuId(null);
  };

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setSelectedCsoId(value);
    loadGroupLeaders(1, value);
  };

  const handlePreviousPage = () => {
    if ((pagination?.page || 1) > 1) {
      loadGroupLeaders((pagination?.page || 1) - 1);
    }
  };

  const handleNextPage = () => {
    if ((pagination?.page || 1) < (pagination?.totalPages || 1)) {
      loadGroupLeaders((pagination?.page || 1) + 1);
    }
  };

  const totalPages = Math.max(pagination?.totalPages || 1, 1);
  const currentPage = Math.min(pagination?.page || 1, totalPages);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const references = Object.values(menuRefs.current || {});
      const isOutside = references.every((ref) => ref && !ref.contains(event.target));
      if (isOutside) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const renderStatus = (status) => {
    if (!status) return '—';
    return status
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const isValid = useMemo(
    () =>
      formData.groupName.trim() !== '' &&
      formData.firstName.trim() !== '' &&
      formData.lastName.trim() !== '' &&
      formData.address.trim() !== '' &&
      formData.phone.trim() !== '' &&
      formData.csoId.trim() !== '' &&
      formData.csoName.trim() !== '',
    [formData]
  );

  return (
    <PageWrapper>
      <h2>Group Leaders</h2>
      <ControlsRow>
        <FilterGroup>
          <label>
            Filter by CSO
            <select value={selectedCsoId} onChange={handleFilterChange}>
              <option value="">All CSOs</option>
              {csos?.map((cso) => (
                <option key={cso._id} value={cso.workId}>
                  {`${cso.firstName} ${cso.lastName}`} ({cso.workId})
                </option>
              ))}
            </select>
          </label>
        </FilterGroup>
      </ControlsRow>

      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <ModalHeader>
              <h3>{editingLeaderId ? 'Update Group Leader' : 'Add Group Leader'}</h3>
              <button type="button" onClick={handleCloseModal} aria-label="Close">
                × 
              </button>
            </ModalHeader>
            <ModalForm onSubmit={handleSubmit}>
              <label>
                Group Name
                <input
                  name="groupName"
                  value={formData.groupName}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Group Leader First Name
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Group Leader Last Name
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Group Leader Address
                <input
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Group Leader Phone
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </label>
              <label>
                Customer Service Officer
                <select
                  name="csoId"
                  value={formData.csoId}
                  onChange={handleCsoChange}
                  required
                >
                  <option value="">Select CSO</option>
                  {csos?.map((cso) => (
                    <option key={cso._id} value={cso.workId}>
                      {`${cso.firstName} ${cso.lastName}`} ({cso.workId})
                    </option>
                  ))}
                </select>
              </label>

              {(error || successMessage) && (
                <p className={`status-message ${error ? 'error' : 'success'}`}>
                  {error || successMessage}
                </p>
              )}

              <button type="submit" disabled={!isValid || submitting}>
                {submitting ? <PulseLoader color="#ffffff" size={8} /> : editingLeaderId ? 'Update' : 'Save'}
              </button>
            </ModalForm>
          </ModalContent>
        </ModalOverlay>
      )}

      <TableContainer>
        {loading ? (
          <PulseLoader color="#0c1d55" size={10} />
        ) : (
          <ScrollContainer>
            <StyledTable>
            <thead>
              <tr>
                <th>Group Name</th>
                <th>Full Name</th>
                <th>Address</th>
                <th>Phone</th>
                <th>CSO Name</th>
                <th>Status</th>
                {/* <th>Created At</th> */}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {leaders?.map((leader) => (
                <tr key={leader._id}>
                  <td>{leader.groupName}</td>
                  <td>{`${leader.firstName} ${leader.lastName}`}</td>
                  <td>{leader.address}</td>
                  <td>{leader.phone}</td>
                  <td>{leader.csoName}</td>
                  <td>{renderStatus(leader.status)}</td>
                  {/* <td>
                    {leader.createdAt
                      ? new Date(leader.createdAt).toLocaleDateString()
                      : '—'}
                  </td> */}
                  <td>
                    <ActionsCell ref={(node) => {
                      if (node) {
                        menuRefs.current[leader._id] = node;
                      } else {
                        delete menuRefs.current[leader._id];
                      }
                    }}>
                      <ActionToggle onClick={() => setOpenMenuId((prev) => (prev === leader._id ? null : leader._id))}>
                        <span />
                        <span />
                        <span />
                      </ActionToggle>
                      {openMenuId === leader._id && (
                        <ActionMenu>
                          {leader.status === 'waiting for approval' ? (
                            <>
                              <ActionMenuButton
                                type="button"
                                variant="primary"
                                onClick={() => handleApprove(leader._id)}
                                disabled={actionLoadingId === leader._id}
                              >
                                Approve
                              </ActionMenuButton>
                              <ActionMenuButton
                                type="button"
                                variant="danger"
                                onClick={() => handleReject(leader._id)}
                                disabled={actionLoadingId === leader._id}
                              >
                                Reject
                              </ActionMenuButton>
                            </>
                          ) : (
                            <ActionMenuButton type="button" variant="primary" onClick={() => handleEdit(leader)}>
                              Update
                            </ActionMenuButton>
                          )}
                          {(leader.status === 'approved' || leader.status === 'rejected') && (
                            <ActionMenuButton
                              type="button"
                              variant="danger"
                              onClick={() => handleDelete(leader._id)}
                              disabled={actionLoadingId === leader._id}
                            >
                              Delete
                            </ActionMenuButton>
                          )}
                        </ActionMenu>
                      )}
                    </ActionsCell>
                  </td>
                </tr>
              ))}
              {leaders.length === 0 && (
                <tr>
                  <td colSpan="6">No group leaders available.</td>
                </tr>
              )}
            </tbody>
            </StyledTable>
          </ScrollContainer>
        )}
      </TableContainer>
      <PaginationWrapper>
        <PaginationButton type="button" onClick={handlePreviousPage} disabled={currentPage <= 1 || loading}>
          Previous
        </PaginationButton>
        <span className="page-info">
          Page {currentPage} of {totalPages}
        </span>
        <PaginationButton
          type="button"
          onClick={handleNextPage}
          disabled={currentPage >= totalPages || loading}
        >
          Next
        </PaginationButton>
      </PaginationWrapper>
    </PageWrapper>
  );
};

export default ManagerGroupLeader;

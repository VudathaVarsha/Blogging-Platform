import React, { useState } from 'react';
import styled from 'styled-components';

// Styled components for the blurred background and modal
const Container = styled.div`
  position: relative;
`;

const BlurBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  z-index: 10;
`;

const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: white;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  z-index: 20;
`;

// The main EditComponent
const EditComponent = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCloseClick = () => {
    setIsEditing(false);
  };

  return (
    <Container>
      <button onClick={handleEditClick}>Edit</button>

      {isEditing && (
        <>
          <BlurBackground onClick={handleCloseClick} />
          <Modal>
            <h2>Edit Component</h2>
            <p>Here you can edit your content.</p>
            <button onClick={handleCloseClick}>Close</button>
          </Modal>
        </>
      )}
    </Container>
  );
};

export default EditComponent;
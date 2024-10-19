import React from 'react';
import { Button, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { logoutUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

const LogoutButton: React.FC = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const navigate = useNavigate();

  const handleLogout = async () => {
    // Add your logout logic here
    console.log('User logged out');

    try {
      const data = await logoutUser();
      console.log(data);
      navigate('/signin');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <>
      <Button
        color="danger"
        variant='flat'
        onPress={onOpen}
      >
        Logout
      </Button>
      <Modal
        isOpen={isOpen}
        placement='auto'
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Logging out</ModalHeader>
              <ModalBody>
                <p>
                  You sure you want to log out?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="danger" onPress={handleLogout}>
                  Logout
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default LogoutButton;
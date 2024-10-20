import React, { Dispatch, SetStateAction } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Calendar, DateValue } from "@nextui-org/react";

interface CalendarModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  calendarDate: DateValue | undefined;
  setCalendarDate: React.Dispatch<React.SetStateAction<DateValue | undefined>>;
}

const CalendarModal: React.FC<CalendarModalProps> = (props) => {
  const { isOpen, onOpenChange, setIsMenuOpen, calendarDate, setCalendarDate } = props;

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Select custom date</ModalHeader>
            <ModalBody>
              <div className="flex justify-center items-center">
                <Calendar
                  aria-label="Date (No Selection)"
                  value={calendarDate}
                  onChange={setCalendarDate}
                />
              </div>
            </ModalBody>

            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={() => {
                onClose();
                setIsMenuOpen(false);
              }}>
                Select
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal >
  )
}

export default CalendarModal;

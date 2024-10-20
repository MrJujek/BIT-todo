import React, { Dispatch, SetStateAction } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, RangeCalendar } from "@nextui-org/react";
import { CalendarDate } from "@internationalized/date";

interface CalendarRangeModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
  calendarDate: {
    start: CalendarDate;
    end: CalendarDate;
  }
  setCalendarDate: React.Dispatch<React.SetStateAction<{
    start: CalendarDate;
    end: CalendarDate;
  }>>;
}

const CalendarRangeModal: React.FC<CalendarRangeModalProps> = (props) => {
  const { isOpen, onOpenChange, setIsMenuOpen, calendarDate, setCalendarDate } = props;

  return (
    < Modal isOpen={isOpen} onOpenChange={onOpenChange} >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Select custom date</ModalHeader>
            <ModalBody>
              <div className="flex justify-center items-center">
                <RangeCalendar
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

export default CalendarRangeModal;

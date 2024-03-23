import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import TicketList from "./Ticket/TicketList";
import { CreateTicketForm, defaultFormValues } from "./Ticket/types";
import TicketDetails from "./Ticket/TicketDetails";
import { useState } from "react";

function App() {
  const [selectedTicket, setSelectedTicket] =
    useState<CreateTicketForm>(defaultFormValues);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleRowSelect = (item: CreateTicketForm) => {
    setSelectedTicket(item);
    onOpen();
  };
  return (
    <VStack w="100Vw" h="100Vh" bgColor="gray.50">
      <TicketList handleRowSelect={handleRowSelect} />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <TicketDetails selectedTicket={selectedTicket} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
}

export default App;

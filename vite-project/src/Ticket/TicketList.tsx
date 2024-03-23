import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Input,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import CreateTicketComponent from "./CreateTicketComponent";
import TicketItem from "./TicketItem";
import { CreateTicketForm } from "./types";
import { useNavigate } from "react-router-dom";

interface TicketListProps {
  handleRowSelect: (item: CreateTicketForm) => void;
}

const TicketList: React.FC<TicketListProps> = ({ handleRowSelect }) => {
  const [ticketDetails, setTicketDetails] = useState<CreateTicketForm[]>(() => {
    const storedTickets = localStorage.getItem("tickets");
    return storedTickets ? JSON.parse(storedTickets) : [];
  });

  const [checkedDetails, setCheckedDetails] = useState<CreateTicketForm[]>(
    () => {
      const storedTickets = localStorage.getItem("checkedTickets");
      return storedTickets ? JSON.parse(storedTickets) : [];
    }
  );

  const [editTicket, setEditTicket] = useState<CreateTicketForm>();
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredTicketDetails, setFilteredTicketDetails] = useState<
    CreateTicketForm[]
  >(() => {
    const storedTickets = localStorage.getItem("tickets");
    return storedTickets ? JSON.parse(storedTickets) : [];
  });

  const history = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const tabValue = queryParams.get("tab") ?? "";

  const [tabIndex, setTabIndex] = useState<number>(parseInt(tabValue));

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    localStorage.setItem("tickets", JSON.stringify(ticketDetails));
    localStorage.setItem("checkedTickets", JSON.stringify(checkedDetails));
  }, [checkedDetails, ticketDetails]);

  const onUpdateTicketDetails = (value: CreateTicketForm) => {
    const newTicket = {
      id: Date.now(),
      ...value,
    };

    // Check if there's already a ticket with the same ID
    const existingIndex = ticketDetails.findIndex(
      (ticket) => ticket.id === newTicket.id
    );
    if (existingIndex !== -1) {
      // If there's a ticket with the same ID, update the existing ticket
      const updatedTickets = [...ticketDetails];
      updatedTickets[existingIndex] = newTicket;
      setTicketDetails(updatedTickets);
    } else {
      // If there's no ticket with the same ID, add the new ticket
      setTicketDetails((prev) => [...prev, newTicket]);
    }
    onClose();
  };

  const handleCheckBox = (isChecked: boolean, value: CreateTicketForm) => {
    if (isChecked) {
      setCheckedDetails((prev) => [
        ...prev,
        { ...value, isChecked: isChecked },
      ]);
      setTicketDetails((prev) => prev.filter((ticket) => ticket !== value));
    } else {
      setTicketDetails((prev) => [...prev, value]);
      setCheckedDetails((prev) => prev.filter((ticket) => ticket !== value));
    }
  };

  const handleTabChange = useCallback(
    (index: number) => {
      setTabIndex(index);
      history({
        pathname: location.pathname,
        search: `tab=${index}`,
      });
    },
    [history]
  );

  const handleClose = () => {
    setEditTicket({});
    onClose();
  };

  const handleEdit = (item: CreateTicketForm) => {
    setEditTicket(item);
    onOpen();
  };

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchQuery = e.target.value.toLowerCase();
    setSearchValue(searchQuery);
    if (searchQuery.trim() === "") {
      setFilteredTicketDetails(ticketDetails);
    } else {
      const filteredData = ticketDetails.filter((ticket) =>
        ticket.title.toLowerCase().includes(searchQuery)
      );
      setFilteredTicketDetails(filteredData);
    }
  };

  return (
    <VStack w="full" h="full" p={5}>
      <Tabs index={tabIndex} onChange={handleTabChange} w="full">
        <TabList display="flex" justifyContent="space-between">
          <HStack w="full">
            <Tab>Open Tickets</Tab>
            <Tab>Resolved Tickets</Tab>
          </HStack>
          {tabIndex === 0 && (
            <HStack>
              <Box width="250px">
                <Input
                  value={searchValue}
                  onChange={handleSearch}
                  borderRadius="4px"
                  size="sm"
                  name="search"
                  placeholder="search tickets"
                />
              </Box>
              <Button size="sm" colorScheme="blue" onClick={onOpen}>
                Create Ticket
              </Button>
            </HStack>
          )}
        </TabList>
        <TabPanels>
          <TabPanel>
            <TicketItem
              ticketDetails={filteredTicketDetails}
              handleCheckbox={handleCheckBox}
              handleRow={handleRowSelect}
              handleEdit={handleEdit}
            />
          </TabPanel>
          <TabPanel>
            <TicketItem
              ticketDetails={checkedDetails}
              handleRow={handleRowSelect}
              handleEdit={handleEdit}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Drawer size="md" isOpen={isOpen} placement="right" onClose={handleClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your Ticket</DrawerHeader>
          <DrawerBody>
            <CreateTicketComponent
              onUpdateTicketDetails={onUpdateTicketDetails}
              handleClose={onClose}
              editTicket={editTicket as CreateTicketForm}
            />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </VStack>
  );
};

export default TicketList;

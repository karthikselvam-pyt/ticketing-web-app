import {
  Button,
  FormLabel,
  HStack,
  Input,
  Select,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { CreateTicketForm } from "./types";

interface CreateTicketComponent {
  onUpdateTicketDetails: (value: CreateTicketForm) => void;
  handleClose: () => void;
  editTicket: CreateTicketForm;
}

const CreateTicketComponent: React.FC<CreateTicketComponent> = (props) => {
  const { onUpdateTicketDetails, handleClose, editTicket } = props;

  const [formValues, setFormValues] = useState<CreateTicketForm>(editTicket);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onUpdateTicketDetails(formValues);
  };
  return (
    <VStack w="full" h="full" spacing={5} bgColor="grey.800">
      <form style={{ width: "100%" }} onSubmit={handleSubmit}>
        <VStack w="full" h="full" spacing={8}>
          <VStack spacing={0} alignItems="start" w="full">
            <FormLabel>Title</FormLabel>
            <Input
              name="title"
              isRequired
              placeholder="Enter Your Title"
              value={formValues?.title}
              onChange={(e) => {
                setFormValues((prev) => ({
                  ...prev,
                  title: e.target.value,
                }));
              }}
            />
          </VStack>
          <VStack spacing={0} alignItems="start" w="full">
            <FormLabel>Description</FormLabel>
            <Textarea
              name="description"
              isRequired
              placeholder="Write Your description..."
              value={formValues?.description}
              onChange={(e) => {
                setFormValues((prev) => ({
                  ...prev,
                  description: e.target.value,
                }));
              }}
            />
          </VStack>
          <VStack spacing={0} alignItems="start" w="full">
            <FormLabel>Priority</FormLabel>
            <Select
              name="priority"
              isRequired
              placeholder="Select Priority"
              value={formValues?.priority}
              onChange={(e) => {
                setFormValues((prev) => ({
                  ...prev,
                  priority: e.target.value,
                }));
              }}
            >
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </Select>
          </VStack>
          <VStack spacing={0} alignItems="start" w="full">
            <FormLabel>Category</FormLabel>
            <Select
              name="category"
              isRequired
              placeholder="Select Category"
              value={formValues?.category}
              onChange={(e) => {
                setFormValues((prev) => ({
                  ...prev,
                  category: e.target.value,
                }));
              }}
            >
              <option value="marketing">Marketing</option>
              <option value="sales">Sales</option>
              <option value="customer_query">Customer Query</option>
            </Select>
          </VStack>
          <HStack justifyContent="end" w="full">
            <Button size="md" variant="outline" mr={3} onClick={handleClose}>
              Cancel
            </Button>
            <Button type="submit" size="md" colorScheme="blue">
              Save
            </Button>
          </HStack>
        </VStack>
      </form>
    </VStack>
  );
};

export default CreateTicketComponent;

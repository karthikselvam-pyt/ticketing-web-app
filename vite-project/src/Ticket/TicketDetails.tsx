import React from "react";
import { CreateTicketForm } from "./types";
import { HStack, VStack, Text } from "@chakra-ui/react";

interface TicketDetailsProps {
  selectedTicket: CreateTicketForm;
}

const TicketDetails: React.FC<TicketDetailsProps> = ({ selectedTicket }) => {
  const { category, description, priority, title, isChecked } = selectedTicket;
  return (
    <VStack w="full" h="full" spacing={6}>
      <HStack justifyContent="space-evenly" w="full">
        <Text
          textAlign="left"
          fontStyle="normal"
          fontSize="xl"
          fontWeight="20px"
        >
          Title
        </Text>
        <Text>{title}</Text>
      </HStack>
      <HStack justifyContent="space-evenly" w="full">
        <Text
          textAlign="left"
          fontStyle="normal"
          fontSize="xl"
          fontWeight="20px"
        >
          description
        </Text>
        <Text>{description}</Text>
      </HStack>
      <HStack justifyContent="space-evenly" w="full">
        <Text
          textAlign="left"
          fontStyle="normal"
          fontSize="xl"
          fontWeight="20px"
        >
          Prioriity
        </Text>
        <Text>{priority}</Text>
      </HStack>
      <HStack justifyContent="space-evenly" w="full">
        <Text
          textAlign="left"
          fontStyle="normal"
          fontSize="xl"
          fontWeight="20px"
        >
          Category
        </Text>
        <Text>{category}</Text>
      </HStack>{" "}
      {isChecked && (
        <HStack justifyContent="space-evenly" w="full">
          <Text
            textAlign="left"
            fontStyle="normal"
            fontSize="xl"
            fontWeight="20px"
          >
            Resolved
          </Text>
          <Text>{isChecked ? "Yes" : "No"}</Text>
        </HStack>
      )}
    </VStack>
  );
};

export default TicketDetails;

import {
  Checkbox,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { CreateTicketForm } from "./types";

import { EditIcon } from "@chakra-ui/icons";

interface TicketItemProps {
  ticketDetails: CreateTicketForm[];
  handleCheckbox?: (isChecked: boolean, item: CreateTicketForm) => void;
  handleRow: (item: CreateTicketForm) => void;
  handleEdit: (item: CreateTicketForm) => void;
}

const TicketItem: React.FC<TicketItemProps> = ({
  ticketDetails,
  handleCheckbox,
  handleRow,
  handleEdit,
}) => {
  return (
    <TableContainer>
      <Table variant="striped">
        <Thead>
          <Tr>
            <Th>Status</Th>
            <Th>Title</Th>
            <Th>category</Th>
            <Th>Priority</Th>
          </Tr>
        </Thead>
        <Tbody>
          {ticketDetails.map((item, idx) => {
            const { title, category, priority, isChecked } = item;
            return (
              <Tr cursor="pointer" key={idx} onClick={() => handleRow(item)}>
                <Td>
                  <Checkbox
                    name="status"
                    onChange={(e) => {
                      handleCheckbox?.(e.target.checked, item);
                      e.stopPropagation();
                    }}
                    isChecked={isChecked}
                  />
                </Td>
                <Td>{title}</Td>
                <Td>{category.replace("_", " ")}</Td>
                <Td>{priority}</Td>
                {!isChecked && (
                  <Td>
                    <EditIcon
                      onClick={(e) => {
                        e.stopPropagation();
                        handleEdit(item);
                      }}
                    />
                  </Td>
                )}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TicketItem;

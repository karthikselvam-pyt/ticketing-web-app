export interface CreateTicketForm {
  title: string;
  description: string;
  priority: string;
  category: string;
  isChecked?: boolean;
  id?: number;
}

export const defaultFormValues = {
  title: "",
  description: "",
  priority: "",
  category: "",
};

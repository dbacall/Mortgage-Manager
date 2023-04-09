import type { Client } from "src/types/interfaces";

export interface ClientSelectProps {
  companyId: string;
  setSelectedClient: (client: Client | null) => void;
}

export interface ClientOption {
  value: Client,
  label: string
}
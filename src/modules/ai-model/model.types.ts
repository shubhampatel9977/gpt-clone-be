export interface CreateModelInput {
  label: string;
  value: string;
  provider: string;
  description?: string;
  isDefault?: boolean;
}

export interface UpdateModelInput {
  label?: string;
  value?: string;
  provider?: string;
  description?: string;
  isDefault?: boolean;
  isActive?: boolean;
}

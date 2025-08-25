export interface Invoice {
  id: string | number;
  orderId?: string | number;
  date?: string;
  amount?: number;
  status?: string;
}
export interface User {
  email: string;
  role: string;
  credit?: number;
}

export interface UploadFile {
  id: string | number;
  filename: string;
  customer?: string;
  uploaded?: string;
  reviewed?: boolean;
  complete?: boolean;
  status?: string;
  lastUpdated?: string;
  vehicle?: string;
  registration?: string;
  ecu?: string;
  ecuType?: string;
  options?: string;
  manufacturer?: string;
  model?: string;
  buildYear?: string;
  engine?: string;
  transmission?: string;
  toolUsed?: string;
}

export interface Article {
  id: number | string;
  title: string;
  summary?: string;
  link?: string;
}

export interface ChatMessage {
  sender: string;
  time?: string | number;
  text: string;
  fileUrl?: string;
}

export interface Vehicle {
  make: string;
  model: string;
  engine: string;
  stockBhp?: string;
  stockNm?: string;
  stage1?: string;
  stage2?: string;
  stage3?: string;
}

export type TheadingProps = {
   title: string;
   description: string;
};

export type TservicesColumnProps = {
   id: bigint;
   title: string;
   short_description: string;
   description: string;
   image: string;
   created_at: string;
};

export type TemployeesColumnProps = {
   id: bigint;
   name: string;
   email: string;
   address: string;
   phone_number: string;
   state: string;
   created_at: string;
};

export type TmodallProps = {
   title: string;
   description: string;
   isOpen: boolean;
   onClose: () => void;
   children?: React.ReactNode;
};

export type TuseAlerteModalProps = {
   loading?: boolean;
   isOpen: boolean;
   onClose: () => void;
   onConfirm: () => void;
};

export type TuserProps = {
   id: string;
   name: string;
   email: string;
   image: string;
   role: string;
   created_at: Date;
};

export type TproductsColumnProps = {
   id: bigint;
   title: string;
   price: string;
   color: string;
   size: string;
   description: string;
   shortDescription: string;
   images: string[];
   created_at: string;
};

export type TRequestServicesColumnProps = {
   id: bigint;
   service_title: string;
   service_description: string;
   created_at: string;
   steps: {
      step_title: string;
      step_description: string;
      options: {
         size: string;
         time: number;
         price: number;
      }[];
   }[];
};
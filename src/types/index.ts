export type TproductColumnProps = {
   id: string;
   name: string;
   category: string;
   image: string;
   subCategory: string;
   shortDescription: string;
   longDescription: string;
   isFeatured?: boolean;
   isArchived?: boolean;
   topBrands?: boolean;
};

export type TcategoriesProps = {
   id: string;
   name: string;
};

export type TsubcategoriesProps = {
   id: string;
   name: string;
   category_id: string;
   category_name: string;
};

export type TheadingProps = {
   title: string;
   description: string;
};

export type TBillboardColumnProps = {
   id: string;
   label: string;
   createdAt: string;
};

export type TadvantageColumnProps = {
   id: bigint;
   title: string;
   subTitle: string;
   serviceTitle1: string;
   serviceTitle2: string;
   serviceTitle3: string;
   serviceDescription1: string;
   serviceDescription2: string;
   serviceDescription3: string;
   serviceImage1: string;
   serviceImage2: string;
   serviceImage3: string;
};
export type TServicesColumnProps = {
   id: bigint;
   title: string;
   description: string;
   createdAt: string;
};

export type TRequestServicesColumnProps = {
   id: bigint;
   service_title: string;
   service_description: string;
   steps: {
      step_title: string;
      step_description: string;
      options: {
         size: string;
         time: string;
         price: string;
      }[];
   }[];
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


export type TservicesColumnProps = {
   id: bigint;
   title: string;
   short_description: string;
   description: string;
   image: string;
   created_at: string;
};

export type TRequestBookingColumnProps = {
   id: bigint;
   title: string;
   description: string;
};

export type TServicesHeroColumnProps = {
   id: bigint;
   title: string;
   createdAt: string;
};

export type TproductHeroColumnProps = {
   id: bigint;
   title: string;
   createdAt: string;
};

export type TRequestHeroColumnProps = {
   id: bigint;
   title: string;
   createdAt: string;
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
   name: string;
   email: string;
};


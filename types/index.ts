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
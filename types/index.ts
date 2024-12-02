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
export enum CategoryStatus {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  DELETED = 'deleted',
}

export interface CategoryTreeNode {
  _id: string;
  name: string;
  slug: string;
  parentCategory?: string;
  children?: CategoryTreeNode[];
}

export interface RequestUser {
  id: string; // Mongo ObjectId as string
  isAdmin: boolean;
  email: string;
  // Add more fields as needed
}

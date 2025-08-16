import { createStorage } from "@/shared/lib/storage/createStorage";

interface UserApiKeys {
  publicKey: string;
  secretKey: string;
}

export const userKeysStorage = createStorage<UserApiKeys>("user-api-keys");

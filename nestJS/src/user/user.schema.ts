import { z } from 'zod';

export const CreateUserschema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    id:z.number()
  })
  // .required();

export type CreateUserDto = z.infer<typeof CreateUserschema>;

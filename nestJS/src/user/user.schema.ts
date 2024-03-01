import { z } from 'zod';

export const CreateUserschema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    // password: z.string().min(6),
    id:z.number()
  })
  // .required();

export type CreateUserDto = z.infer<typeof CreateUserschema>;

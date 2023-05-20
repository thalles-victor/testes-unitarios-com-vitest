import { z } from "zod";

export const CreateUserDTOSchema = z.object({
  name: z.string(),
  user_name: z.string(),
  email: z.string().email(),
  password: z.string().min(6).max(23),
});

export type CreateUserDTOProps = z.infer<typeof CreateUserDTOSchema>;

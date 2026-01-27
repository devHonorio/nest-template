import { parsePhoneNumber } from 'libphonenumber-js/min';
import { createZodDto } from 'nestjs-zod';
import z from 'zod';
z.config(z.locales.pt());
const authSchema = z.object({
  phone: z
    .string()
    .min(4)
    .transform((phone) => `${phone}`.replace(/\D/g, ''))
    .refine((phone) => phone.length >= 5, {
      error: 'Muito pequeno: esperado que string tivesse >=5 caracteres',
    })
    .refine(
      (phone) => {
        const phoneNumber = parsePhoneNumber(`+${phone}`);
        return phoneNumber.isValid();
      },
      {
        message:
          'O número de telefone informado é inválido para qualquer região global.',
      },
    ),
});

export class AuthDto extends createZodDto(authSchema) {}

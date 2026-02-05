import { parsePhoneNumber } from 'awesome-phonenumber';
import { createZodDto } from 'nestjs-zod';

import z from 'zod';

z.config(z.locales.pt());

const signupSchema = z.object({
  phone: z
    .string()
    .min(3)
    .transform((phone) => `+${phone.replace(/\D/g, '')}`)
    .refine(
      (phone) => {
        const phoneNumber = parsePhoneNumber(`${phone}`);
        return phoneNumber.valid;
      },
      {
        message:
          'O número de telefone informado é inválido para qualquer região global.',
      },
    ),
  name: z
    .string()
    .min(2, 'O nome deve ter entre 2 e 100 caracteres.')
    .max(100, 'O nome deve ter entre 2 e 100 caracteres.')
    .trim()
    .refine((name) => name.split(' ').length >= 2, {
      message: 'O sobrenome é obrigatório.',
    })
    .refine((name) => /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(name), {
      message: 'O nome deve conter apenas letras e espaços.',
    })
    .refine(
      (name) => {
        const parts = name.split(' ');

        for (const part of parts) {
          if (part.length < 2) return false;
        }
        return true;
      },
      {
        message: 'O nome não deve conter abreviações.',
      },
    ),
});
export class SignupDto extends createZodDto(signupSchema) {}

import { z } from "zod";

export const formSchema = z.object({
  productType: z.enum(["ecobag", "hoop"], {
    required_error: "Selecione o tipo de produto",
  }),

  threadCount: z.coerce.number().min(1, "Informe a quantidade de linhas"),

  hoursWorked: z.coerce.number().min(1, "Informe as horas trabalhadas"),

  hourlyRate: z.coerce.number().min(1, "Informe o valor por hora"),

  hoopSizePrice: z.coerce.number().optional(),
  fabricPrice: z.coerce.number().optional(),
  hasPatternFabric: z.boolean().optional(),

  basePrice: z.coerce.number().optional(),

  extraCost: z.coerce.number().optional(),
});

export type FormData = z.infer<typeof formSchema>;

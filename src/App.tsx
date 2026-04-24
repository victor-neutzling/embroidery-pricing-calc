import {
  Box,
  Typography,
  Input,
  Button,
  Select,
  Option,
  Checkbox,
  FormControl,
  FormLabel,
  FormHelperText,
  Card,
  Divider,
} from "@mui/joy";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import { formSchema, type FormData } from "./schema";

const parseBRL = (value: string) => {
  return Number(value.replace(/[^\d]/g, "")) / 100;
};

const formatBRL = (value: number) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

export default function App() {
  const [totalPrice, setTotalPrice] = useState<number | null>(null);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productType: undefined,
      threadCount: 0,
      hoursWorked: 1,
      hourlyRate: 0,
      basePrice: 30,
      hoopSizePrice: 25,
      fabricPrice: 5,
      hasPatternFabric: false,
      extraCost: 0,
    },
  });

  const productType = watch("productType");

  useEffect(() => {
    if (productType === "ecobag") {
      setValue("hourlyRate", 11);
    } else if (productType === "hoop") {
      setValue("hourlyRate", 10);
    }
  }, [productType, setValue]);

  const onSubmit = (data: FormData) => {
    const baseCost = data.threadCount * 5 + 2;

    let total;

    if (data.productType === "ecobag") {
      total =
        baseCost +
        data.hoursWorked * data.hourlyRate +
        (data.basePrice || 0) +
        (data.extraCost || 0);
    } else {
      total =
        baseCost +
        data.hoursWorked * data.hourlyRate +
        (data.hoopSizePrice || 0) +
        (data.fabricPrice || 0) +
        (data.hasPatternFabric ? 5 : 0) +
        0.05 +
        1.5 +
        (data.extraCost || 0);
    }

    setTotalPrice(total);
  };

  return (
    <Box sx={{ maxWidth: 520, mx: "auto", p: 2 }}>
      <Card variant="outlined" sx={{ p: 2, gap: 2 }}>
        <Typography level="h1" sx={{ marginBottom: "-24px" }}>
          Bordadicos.
        </Typography>
        <Typography level="h3">Calculadora de orçamento de bordados</Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <FormControl error={!!errors.productType}>
            <FormLabel>Tipo de produto</FormLabel>
            <Controller
              name="productType"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  onChange={(_, value) => field.onChange(value)}
                >
                  <Option value="ecobag">Ecobag</Option>
                  <Option value="hoop">Bastidor</Option>
                </Select>
              )}
            />
            <FormHelperText>{errors.productType?.message}</FormHelperText>
          </FormControl>

          {productType && (
            <>
              <Divider />

              <Typography level="title-md">Detalhes do desenho</Typography>

              <FormControl error={!!errors.threadCount}>
                <FormLabel>Quantidade de linhas</FormLabel>
                <Controller
                  name="threadCount"
                  control={control}
                  render={({ field }) => <Input type="number" {...field} />}
                />
                <FormHelperText>{errors.threadCount?.message}</FormHelperText>
              </FormControl>

              <Divider />

              <Typography level="title-md">Trabalho</Typography>

              <FormControl error={!!errors.hoursWorked}>
                <FormLabel>Horas trabalhadas</FormLabel>
                <Controller
                  name="hoursWorked"
                  control={control}
                  render={({ field }) => <Input type="number" {...field} />}
                />
                <FormHelperText>{errors.hoursWorked?.message}</FormHelperText>
              </FormControl>

              <FormControl error={!!errors.hourlyRate}>
                <FormLabel>Valor por hora</FormLabel>
                <Controller
                  name="hourlyRate"
                  control={control}
                  render={({ field }) => (
                    <Input
                      value={field.value ? formatBRL(field.value) : ""}
                      onChange={(e) => field.onChange(parseBRL(e.target.value))}
                    />
                  )}
                />
                <FormHelperText>{errors.hourlyRate?.message}</FormHelperText>
              </FormControl>

              <Divider />

              {productType === "ecobag" && (
                <>
                  <Typography level="title-md">Ecobag</Typography>

                  <FormControl error={!!errors.basePrice}>
                    <FormLabel>Valor base</FormLabel>
                    <Controller
                      name="basePrice"
                      control={control}
                      render={({ field }) => (
                        <Input
                          value={field.value ? formatBRL(field.value) : ""}
                          onChange={(e) =>
                            field.onChange(parseBRL(e.target.value))
                          }
                        />
                      )}
                    />
                    <FormHelperText>{errors.basePrice?.message}</FormHelperText>
                  </FormControl>
                </>
              )}

              {productType === "hoop" && (
                <>
                  <Typography level="title-md">Bastidor</Typography>

                  <FormControl error={!!errors.hoopSizePrice}>
                    <FormLabel>Tamanho</FormLabel>
                    <Controller
                      name="hoopSizePrice"
                      control={control}
                      render={({ field }) => (
                        <Input
                          value={field.value ? formatBRL(field.value) : ""}
                          onChange={(e) =>
                            field.onChange(parseBRL(e.target.value))
                          }
                        />
                      )}
                    />
                  </FormControl>

                  <FormControl error={!!errors.fabricPrice}>
                    <FormLabel>Tecido</FormLabel>
                    <Controller
                      name="fabricPrice"
                      control={control}
                      render={({ field }) => (
                        <Input
                          value={field.value ? formatBRL(field.value) : ""}
                          onChange={(e) =>
                            field.onChange(parseBRL(e.target.value))
                          }
                        />
                      )}
                    />
                  </FormControl>

                  <FormControl>
                    <Controller
                      name="hasPatternFabric"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          label="Tecido estampado (+R$5)"
                          checked={field.value}
                          onChange={(e) => field.onChange(e.target.checked)}
                        />
                      )}
                    />
                  </FormControl>
                </>
              )}

              <Divider />

              <Typography level="title-md">Custos extras</Typography>

              <FormControl>
                <FormLabel>Valor adicional</FormLabel>
                <Controller
                  name="extraCost"
                  control={control}
                  render={({ field }) => (
                    <Input
                      value={field.value ? formatBRL(field.value) : ""}
                      onChange={(e) => field.onChange(parseBRL(e.target.value))}
                    />
                  )}
                />
              </FormControl>

              <Button type="submit" size="lg">
                Calcular
              </Button>
            </>
          )}
        </Box>

        {totalPrice !== null && (
          <Card
            variant="soft"
            color="primary"
            sx={{ mt: 2, textAlign: "center" }}
          >
            <Typography level="title-lg">
              Total: {formatBRL(totalPrice)}
            </Typography>
          </Card>
        )}
      </Card>
    </Box>
  );
}

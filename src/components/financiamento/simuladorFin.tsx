'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';

import MoneyInput from '../ui/money-input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';

import { Loader2 } from 'lucide-react';

const financiamentoSchema = z.object({
  valorVeiculo: z.number().positive('Informe um valor válido'),
  entrada: z.number().min(0, 'Não pode ser negativa'),
  parcelas: z.number().int().positive('Mínimo 1 parcela'),
  juros: z.number().min(0, 'Juros inválido'),
  tipoJuros: z.enum(['mes', 'ano']),
});

type FinanciamentoData = z.infer<typeof financiamentoSchema>;

export default function SimuladorFinanciamento({
  precoFipe,
}: {
  precoFipe?: number;
}) {
  const [resultado, setResultado] = useState<string | null>(null);

  const form = useForm<FinanciamentoData>({
    resolver: zodResolver(financiamentoSchema),
    defaultValues: {
      valorVeiculo: precoFipe ?? 0,
      entrada: 0,
      parcelas: 12,
      juros: 1.5,
      tipoJuros: 'mes',
    },
  });

  useEffect(() => {
    if (precoFipe) {
      form.setValue('valorVeiculo', precoFipe);
    }
  }, [form, precoFipe]);

  const onSubmit = (data: FinanciamentoData) => {
    const { valorVeiculo, entrada, parcelas, juros, tipoJuros } = data;

    const valorFinanciado = valorVeiculo - entrada;
    if (valorFinanciado <= 0) {
      toast.error('A entrada não pode ser maior que o valor do veículo');
      return;
    }

    let taxa = juros / 100;
    if (tipoJuros === 'ano') {
      taxa = Math.pow(1 + taxa, 1 / 12) - 1;
    }

    const pmt = (valorFinanciado * taxa) / (1 - Math.pow(1 + taxa, -parcelas));

    setResultado(pmt.toFixed(2).replace('.', ','));
  };

  return (
    <CardContent className="space-y-4 pt-4 px-2">
      <h3 className="font-semibold text-lg mb-1">Financiamento</h3>
      <p className="text-muted-foreground text-sm mb-6">
        Digite os parâmetros ou selecione um carro à esquerda
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Valor veículo */}
          <FormField
            control={form.control}
            name="valorVeiculo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Valor do veículo (R$)</FormLabel>
                <FormControl>
                  <MoneyInput
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Ex: R$ 50.000,00"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Entrada */}
          <FormField
            control={form.control}
            name="entrada"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Entrada (R$)</FormLabel>
                <FormControl>
                  <MoneyInput
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Ex: 10.000"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Parcelas */}
          <FormField
            control={form.control}
            name="parcelas"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Parcelas</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Ex: 48"
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.valueAsNumber || 0)
                    }
                  />
                </FormControl>
                <FormDescription>
                  Em quantos meses você pretende pagar o financiamento.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Juros */}
          <FormField
            control={form.control}
            name="juros"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Taxa de juros</FormLabel>
                <div className="flex gap-2 items-center">
                  <FormControl>
                    <Input
                      type="number"
                      step="0.1"
                      placeholder="Ex: 1.5"
                      className="flex-1"
                      {...field}
                      onChange={(e) =>
                        field.onChange(e.target.valueAsNumber || 0)
                      }
                    />
                  </FormControl>

                  <FormField
                    control={form.control}
                    name="tipoJuros"
                    render={({ field }) => (
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder="Período" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="mes">% ao mês</SelectItem>
                            <SelectItem value="ano">% ao ano</SelectItem>
                          </SelectContent>
                        </Select>
                      </FormControl>
                    )}
                  />
                </div>
                <FormDescription>
                  Valor de juros definido pelo banco.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full mt-4"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Calcular
          </Button>
        </form>
      </Form>

      {resultado && (
        <div className="p-3 border rounded-md bg-white/20 text-black">
          Valor da parcela: <strong>R$ {resultado}</strong>
        </div>
      )}
    </CardContent>
  );
}

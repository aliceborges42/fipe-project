'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import MoneyInput from '@/components/ui/money-input';
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

const desvalorizacaoSchema = z.object({
  valorVeiculo: z.number().positive('Informe um valor válido'),
  anos: z.number().int().positive('Mínimo 1 ano'),
  taxaAnual: z.number().min(0, 'Taxa inválida'),
});

type DesvalorizacaoData = z.infer<typeof desvalorizacaoSchema>;

export default function SimuladorDesv({ precoFipe }: { precoFipe?: number }) {
  const [projecao, setProjecao] = useState<{ ano: number; valor: number }[]>(
    []
  );

  const formDesv = useForm<DesvalorizacaoData>({
    resolver: zodResolver(desvalorizacaoSchema),
    defaultValues: {
      valorVeiculo: precoFipe ?? 0,
      anos: 5,
      taxaAnual: 10,
    },
  });

  useEffect(() => {
    if (precoFipe) {
      formDesv.setValue('valorVeiculo', precoFipe);
    }
  }, [formDesv, precoFipe]);

  const onSubmitDesv = (data: DesvalorizacaoData) => {
    const { valorVeiculo, anos, taxaAnual } = data;

    const taxa = taxaAnual / 100;
    const lista: { ano: number; valor: number }[] = [];

    for (let i = 1; i <= anos; i++) {
      const valor = valorVeiculo * Math.pow(1 - taxa, i);
      lista.push({ ano: i, valor });
    }

    setProjecao(lista);
  };

  return (
    <CardContent className="space-y-4 pt-4 px-2">
      <h3 className="font-semibold text-lg mb-1">Desvalorização</h3>
      <p className="text-muted-foreground text-sm mb-4">
        Selecione um carro à esquerda ou digite o valor do seu veículo
      </p>

      <Form {...formDesv}>
        <form
          onSubmit={formDesv.handleSubmit(onSubmitDesv)}
          className="space-y-4"
        >
          <FormField
            control={formDesv.control}
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

          <FormField
            control={formDesv.control}
            name="anos"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Período da simulação</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Ex: 5"
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.valueAsNumber || 0)
                    }
                  />
                </FormControl>
                <FormDescription>
                  Quantos anos você deseja projetar a desvalorização do veículo.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={formDesv.control}
            name="taxaAnual"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Taxa de desvalorização (% ao ano)</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.1"
                    placeholder="Ex: 10"
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.valueAsNumber || 0)
                    }
                  />
                </FormControl>
                <FormDescription>
                  Percentual médio de perda de valor a cada ano (ex: 10%).
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full mt-4"
            disabled={formDesv.formState.isSubmitting}
          >
            {formDesv.formState.isSubmitting && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Calcular
          </Button>
        </form>
      </Form>

      {projecao.length > 0 && (
        <div className="p-3 border rounded-md bg-white/20 text-black space-y-2">
          <h4 className="font-semibold">Projeção</h4>
          <ul className="list-disc pl-5 text-sm">
            {projecao.map((p) => (
              <li key={p.ano}>
                Após {p.ano} ano(s):{' '}
                <strong>R$ {p.valor.toFixed(2).replace('.', ',')}</strong>
              </li>
            ))}
          </ul>
        </div>
      )}
    </CardContent>
  );
}

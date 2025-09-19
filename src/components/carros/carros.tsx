'use client';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

// Mock de carros
const carros = [
  {
    id: 1,
    nome: 'Toyota Corolla 2022',
    foto: '/carros/corolla.webp',
    valorTotal: 75000,
    entrada: 15000,
    parcelas: 48,
  },
  {
    id: 2,
    nome: 'Honda Civic 2021',
    foto: '/carros/civic.webp',
    valorTotal: 72000,
    entrada: 20000,
    parcelas: 36,
  },
  {
    id: 3,
    nome: 'C3 Aircross 2023',
    foto: '/carros/c3aircross.webp',
    valorTotal: 65000,
    entrada: 13000,
    parcelas: 36,
  },
  {
    id: 4,
    nome: 'Fiat Mobi 2022',
    foto: '/carros/mobi.webp',
    valorTotal: 98000,
    entrada: 20000,
    parcelas: 48,
  },
  {
    id: 5,
    nome: 'Jeep Renegade 2021',
    foto: '/carros/renegade.webp',
    valorTotal: 90000,
    entrada: 18000,
    parcelas: 36,
  },
  {
    id: 6,
    nome: 'Rampage 2021',
    foto: '/carros/rampage.webp',
    valorTotal: 90000,
    entrada: 18000,
    parcelas: 36,
  },
];

const formatCurrency = (valor: number) =>
  valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export default function CarrosselVeiculos() {
  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold text-center mb-8">
        Carros Disponíveis
      </h2>

      <div className="w-full max-w-6xl mx-auto">
        <Carousel className="w-full">
          <CarouselContent className="-ml-1">
            {carros.map((carro) => {
              const valorParcela =
                (carro.valorTotal - carro.entrada) / carro.parcelas;

              return (
                <CarouselItem
                  key={carro.id}
                  className="pl-1 md:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-1">
                    <Card className="min-h-[200px] flex flex-col p-0 gap-2">
                      <div className="relative w-full h-40 rounded-t-md overflow-hidden">
                        <Image
                          src={carro.foto}
                          alt={carro.nome}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <CardContent className="flex flex-col space-y-2 p-4">
                        <div>
                          <h3 className="font-semibold">{carro.nome}</h3>
                          <p>
                            <strong>Valor total:</strong>{' '}
                            {formatCurrency(carro.valorTotal)}
                          </p>
                          <p>
                            <strong>Entrada:</strong>{' '}
                            {formatCurrency(carro.entrada)}
                          </p>
                          <p>
                            <strong>Parcelas ({carro.parcelas}x):</strong>{' '}
                            {formatCurrency(valorParcela)}
                          </p>
                        </div>
                        <Button
                          className="w-full mt-2"
                          onClick={() =>
                            window.open(
                              `https://wa.me/559999999999?text=Olá!%20Tenho%20interesse%20no%20${encodeURIComponent(
                                carro.nome
                              )}`,
                              '_blank'
                            )
                          }
                        >
                          Saber mais
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>

          <div className="flex items-center justify-between mt-6 px-4">
            <div className="flex items-center space-x-2 ml-auto">
              <CarouselPrevious className="static transform-none" />
              <CarouselNext className="static transform-none" />
            </div>
          </div>
        </Carousel>
      </div>
    </section>
  );
}

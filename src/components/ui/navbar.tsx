'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface NavbarProps {
  onNavigate: (
    section: 'financiamento' | 'desvalorizacao' | 'contato' | 'disponiveis'
  ) => void;
}

export function Navbar({ onNavigate }: NavbarProps) {
  function handleClick(
    section: 'financiamento' | 'desvalorizacao' | 'contato' | 'disponiveis'
  ) {
    onNavigate(section);
  }
  return (
    <header className="border-b bg-black">
      <nav className="container mx-auto flex justify-between items-center py-4 px-4">
        <Link href="/" className="text-lg font-bold">
          <div className="hidden lg:block w-[200px] md:w-[180px] h-[80px] md:h-[50px] overflow-hidden relative ">
            <Image
              src="/LogoGGbranco_amarelo.png"
              alt="Grupo Guerra"
              fill
              className="object-cover object-center"
            />
          </div>

          <div className="md:block lg:hidden w-[120px]  h-[50px] overflow-hidden relative ">
            <Image
              src="/Prancheta 2GUERRAGRUPO.png"
              alt="Grupo Guerra"
              fill
              className="object-cover object-center"
            />
          </div>
        </Link>

        <div className="hidden sm:flex gap-4 text-sm">
          <Button
            className="text-white"
            variant="link"
            onClick={() => handleClick('financiamento')}
          >
            Financiamento
          </Button>
          <Button
            className="text-white"
            variant="link"
            onClick={() => handleClick('desvalorizacao')}
          >
            Desvalorização
          </Button>
          <Button
            className="text-white"
            variant="link"
            onClick={() => handleClick('disponiveis')}
          >
            Carros Disponíveis
          </Button>
          <Button
            className="text-white"
            variant="link"
            onClick={() => handleClick('contato')}
          >
            Contato
          </Button>
        </div>
        <div className="sm:hidden">
          <Popover>
            <PopoverTrigger asChild>
              <button className="p-2">
                <Menu className="w-6 h-6 text-white" />
              </button>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col gap-4 w-40 text-center">
              <Button
                variant="link"
                className="hover:underline"
                onClick={() => onNavigate('financiamento')}
              >
                Financiamento
              </Button>
              <Button
                variant="link"
                className="hover:underline"
                onClick={() => onNavigate('desvalorizacao')}
              >
                Desvalorização
              </Button>
              <Button
                variant="link"
                className="hover:underline"
                onClick={() => onNavigate('disponiveis')}
              >
                Carros Disponíveis
              </Button>
              <Button
                variant="link"
                className="hover:underline"
                onClick={() => onNavigate('contato')}
              >
                Contato
              </Button>
            </PopoverContent>
          </Popover>
        </div>
      </nav>
    </header>
  );
}

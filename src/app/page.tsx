'use client';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import FinancialSection from '../components/financiamento/financial';
import ContatoSection from '../components/contato/contact';
import CarrosselVeiculos from '@/components/carros/carros';
import { useRef, useState } from 'react';
import { Navbar } from '@/components/ui/navbar';

export default function Home() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const contatoRef = useRef<HTMLDivElement | null>(null);
  const disponiveisRef = useRef<HTMLDivElement | null>(null);

  const [activeTab, setActiveTab] = useState<
    'financiamento' | 'desvalorizacao'
  >('financiamento');

  function scrollToSection(
    section: 'financiamento' | 'desvalorizacao' | 'contato' | 'disponiveis'
  ) {
    if (section === 'financiamento') {
      setActiveTab('financiamento');
      sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'desvalorizacao') {
      setActiveTab('desvalorizacao');
      sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'contato') {
      contatoRef.current?.scrollIntoView({ behavior: 'smooth' });
    } else if (section === 'disponiveis') {
      disponiveisRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  return (
    <div>
      <Navbar onNavigate={scrollToSection} />
      <section className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-stretch bg-gradient-to-b from-black to-black/80">
          <div className="p-6 md:p-10 md:pt-12 md:pr-24 space-y-6">
            <div className="w-[200px] md:w-[300px] h-[80px] md:h-[100px] overflow-hidden relative mb-2">
              <Image
                src="/LogoGGbranco_amarelo.png"
                alt="Grupo Guerra"
                fill
                className="object-cover object-center"
              />
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight">
              Venha conquistar seu carro próprio com a gente
            </h1>
            <p className="text-base md:text-lg text-white/90">
              Simule aqui o financiamento do seu carro dos sonhos ou calcule a
              projeção de desvalorização de seu carro.
            </p>
            <div className="flex flex-wrap gap-3 md:gap-4 my-6">
              <Button
                size="lg"
                variant="secondary"
                onClick={() => scrollToSection('financiamento')}
              >
                Simular Financiamento
              </Button>
              <Button
                size="lg"
                variant="default"
                onClick={() => scrollToSection('desvalorizacao')}
              >
                Previsão de Desvalorização
              </Button>
            </div>
          </div>
          <div className="hidden lg:flex bg-gradient-to-b from-[#FBCE28] to-[#F5A13A] pr-10 flex-col items-center justify-center pt-16">
            <Image
              src="/car-withou-bg.png"
              alt="Carro destaque"
              width={1000}
              height={1200}
              className="w-full max-w-[800px] min-w-[520px] h-auto object-contain xl:-translate-x-20 lg:--translate-x-16"
            />
          </div>
        </div>
      </section>
      <div ref={sectionRef}>
        <FinancialSection activeTab={activeTab} />
      </div>
      <section ref={disponiveisRef}>
        <CarrosselVeiculos />
      </section>
      <div ref={contatoRef}>
        <ContatoSection />
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { getBrands, getModels, getYears, getVehiclePrice } from '@/lib/api';
import { Ano, Marca, ModeloResponse, Veiculo } from '../../lib/types/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card } from '@/components/ui/card';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCar,
  faTruck,
  faMotorcycle,
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'sonner';
import { Loader2Icon } from 'lucide-react';
import SimuladorDesv from './simuladorDesv';
import SimuladorFinanciamento from './simuladorFin';

type Props = {
  activeTab: 'financiamento' | 'desvalorizacao';
};

export default function FinancialSection({ activeTab }: Props) {
  const [tipo, setTipo] = useState<'carros' | 'motos' | 'caminhoes'>('carros');
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [modelos, setModelos] = useState<ModeloResponse['modelos']>([]);
  const [anos, setAnos] = useState<Ano[]>([]);
  const [veiculo, setVeiculo] = useState<Veiculo | null>(null);

  const [marca, setMarca] = useState<string>('');
  const [modelo, setModelo] = useState<string>('');
  const [ano, setAno] = useState<string>('');

  const [valorVeiculoFinanciamento, setVeiculoFinanciamento] =
    useState<number>(0);

  const [loadingMarcas, setLoadingMarcas] = useState(false);
  const [loadingModelos, setLoadingModelos] = useState(false);
  const [loadingAnos, setLoadingAnos] = useState(false);
  const [loadingVeiculo, setLoadingVeiculo] = useState(false);

  const [valorVeiculoDesvalorizacao, setVeiculoDesvalorizacao] =
    useState<number>(0);
  const [tab, setTab] = useState<'financiamento' | 'desvalorizacao'>(activeTab);
  useEffect(() => {
    setTab(activeTab);
  }, [activeTab]);

  // Handler para mudança de tipo
  const handleTipoChange = (newTipo: 'carros' | 'motos' | 'caminhoes') => {
    setTipo(newTipo);
    // Reset imediato de todos os estados dependentes
    setMarcas([]);
    setModelos([]);
    setAnos([]);
    setVeiculo(null);
    setMarca('');
    setModelo('');
    setAno('');
    setVeiculoFinanciamento(0);
    setVeiculoDesvalorizacao(0);
  };

  // Handler para mudança de marca
  const handleMarcaChange = (value: string) => {
    setMarca(value);
    // Reset imediato dos estados dependentes
    setModelos([]);
    setAnos([]);
    setVeiculo(null);
    setModelo('');
    setAno('');
    setVeiculoFinanciamento(0);
    setVeiculoDesvalorizacao(0);
  };

  // Handler para mudança de modelo
  const handleModeloChange = (value: string) => {
    setModelo(value);
    // Reset imediato dos estados dependentes
    setAnos([]);
    setVeiculo(null);
    setAno('');
    setVeiculoFinanciamento(0);
    setVeiculoDesvalorizacao(0);
  };

  // Handler para mudança de ano
  const handleAnoChange = (value: string) => {
    setAno(value);
    // Reset imediato dos estados dependentes
    setVeiculo(null);
    setVeiculoFinanciamento(0);
    setVeiculoDesvalorizacao(0);
  };

  // Carregar marcas (apenas quando tipo mudar)
  useEffect(() => {
    async function fetchBrands() {
      setLoadingMarcas(true);
      try {
        const data = await getBrands(tipo);
        setMarcas(data);
      } catch (error) {
        console.error('Erro ao carregar marcas:', error);
        toast.error('Erro ao carregar marcas');
      } finally {
        setLoadingMarcas(false);
      }
    }

    fetchBrands();
  }, [tipo]);

  // Carregar modelos (apenas quando marca mudar)
  useEffect(() => {
    async function fetchModels() {
      if (!marca) return;
      setLoadingModelos(true);
      try {
        const data = await getModels(tipo, marca);
        setModelos(data.modelos);
      } catch (error) {
        console.error('Erro ao carregar modelos:', error);
        toast.error('Erro ao carregar modelos');
      } finally {
        setLoadingModelos(false);
      }
    }

    fetchModels();
  }, [marca, tipo]);

  // Carregar anos (apenas quando modelo mudar)
  useEffect(() => {
    async function fetchYears() {
      if (!marca || !modelo) return;
      setLoadingAnos(true);
      try {
        const data = await getYears(tipo, marca, modelo);
        setAnos(data);
      } catch (error) {
        console.error('Erro ao carregar anos:', error);
        toast.error('Erro ao carregar anos');
      } finally {
        setLoadingAnos(false);
      }
    }

    fetchYears();
  }, [modelo, marca, tipo]);

  const searchVehicle = async () => {
    setLoadingVeiculo(true);
    try {
      const data = await getVehiclePrice(tipo, marca, modelo, ano);
      setVeiculo(data);
      const preco = Number(
        data.Valor.replace('R$', '').replace(/\./g, '').replace(',', '.').trim()
      );
      setVeiculoFinanciamento(preco);
      setVeiculoDesvalorizacao(preco);
    } catch (error) {
      console.error('Erro ao buscar veículo:', error);
      toast.error('Erro ao buscar varículo');
    } finally {
      setLoadingVeiculo(false);
    }
  };

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 lg:gap-16 items-stretch">
        {/* Lado Esquerdo*/}
        <div className="p-4 md:p-6 lg:p-10 space-y-4 md:space-y-6">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2 md:mb-4 text-black/80">
            Busque pelo veículo de interesse
          </h1>
          <p className="text-sm md:text-base text-muted-foreground">
            Consulte valores da Tabela FIPE e descubra o preço real do seu
            carro, moto ou caminhão.
          </p>
          <Card className="w-full p-4 md:p-6 lg:p-8 space-y-4">
            <div className="flex flex-wrap gap-2 mb-6">
              {(['carros', 'motos', 'caminhoes'] as const).map((t) => (
                <button
                  key={t}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    tipo === t
                      ? 'bg-gradient-to-b from-[#FBCE28] to-[#F5A13A] text-black/80 shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                  onClick={() => handleTipoChange(t)}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
            <div className="space-y-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  Marca
                  {loadingMarcas && (
                    <Loader2Icon className="animate-spin text-black" />
                  )}
                </label>
                <Select
                  value={marca}
                  onValueChange={handleMarcaChange}
                  disabled={marcas.length === 0 || loadingMarcas}
                >
                  <SelectTrigger
                    className={`w-full py-5 px-4  ${
                      marcas.length === 0
                        ? 'bg-gray-200 text-gray-600'
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    <SelectValue placeholder="Selecione a marca" />
                  </SelectTrigger>
                  <SelectContent className=" border-gray-200 shadow-lg">
                    {marcas.map((m) => (
                      <SelectItem
                        key={m.codigo}
                        value={m.codigo}
                        className="py-3 px-4 hover:bg-orange-50 focus:bg-orange-50"
                      >
                        {m.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  Modelo
                  {loadingModelos && (
                    <Loader2Icon className="h-4 w-4 animate-spin text-black" />
                  )}
                </label>
                <Select
                  value={modelo}
                  onValueChange={handleModeloChange}
                  disabled={!marca || loadingModelos}
                >
                  <SelectTrigger
                    className={`w-full py-5 px-4  ${
                      !marca
                        ? 'bg-gray-200 text-gray-400'
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    <SelectValue placeholder="Selecione o modelo" />
                  </SelectTrigger>
                  <SelectContent className=" border-gray-200 shadow-lg">
                    {modelos.map((m) => (
                      <SelectItem
                        key={m.codigo}
                        value={m.codigo}
                        className="py-3 px-4 hover:bg-orange-50 focus:bg-orange-50"
                      >
                        {m.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Select de Ano */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                  Ano
                  {loadingAnos && (
                    <Loader2Icon className="animate-spin text-black" />
                  )}
                </label>
                <Select
                  value={ano}
                  onValueChange={handleAnoChange}
                  disabled={!modelo || loadingAnos}
                >
                  <SelectTrigger
                    className={`w-full py-5 px-4  ${
                      !modelo
                        ? 'bg-gray-200 text-gray-400'
                        : 'bg-white border-gray-300'
                    }`}
                  >
                    <SelectValue placeholder="Selecione o ano" />
                  </SelectTrigger>
                  <SelectContent className=" border-gray-200 shadow-lg">
                    {anos.map((a) => (
                      <SelectItem
                        key={a.codigo}
                        value={a.codigo}
                        className="py-3 px-4 hover:bg-orange-50 focus:bg-orange-50"
                      >
                        {a.nome}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              {loadingVeiculo ? (
                <Button>
                  <Loader2Icon className="animate-spin text-black" />
                  Buscando Veículos...
                </Button>
              ) : (
                <Button
                  onClick={searchVehicle}
                  disabled={!marca || !modelo || !ano || !tipo}
                >
                  Buscar Veículo
                </Button>
              )}
            </div>

            {/* Resultado da Consulta */}
            {veiculo && (
              <section
                className="p-5 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-200 space-y-3 animate-fade-in"
                aria-labelledby="fipe-title"
              >
                <header className="flex items-center mb-2">
                  {tipo === 'carros' ? (
                    <FontAwesomeIcon icon={faCar} size="lg" />
                  ) : tipo === 'caminhoes' ? (
                    <FontAwesomeIcon icon={faTruck} size="lg" />
                  ) : (
                    <FontAwesomeIcon icon={faMotorcycle} size="lg" />
                  )}
                  <h3
                    id="fipe-title"
                    className="font-semibold text-gray-800 ml-2"
                  >
                    Informações FIPE
                  </h3>
                </header>

                <dl className="grid grid-cols-2 gap-3 text-sm">
                  <dt className="text-gray-600">Modelo:</dt>
                  <dd className="font-medium text-gray-800">
                    {veiculo.Modelo}
                  </dd>

                  <dt className="text-gray-600">Ano:</dt>
                  <dd className="font-medium text-gray-800">
                    {veiculo.AnoModelo}
                  </dd>

                  <dt className="text-gray-600">Combustível:</dt>
                  <dd className="font-medium text-gray-800">
                    {veiculo.Combustivel}
                  </dd>

                  <dt className="text-gray-600">Valor:</dt>
                  <dd className="font-bold text-lg">{veiculo.Valor}</dd>
                </dl>
              </section>
            )}
          </Card>
        </div>

        {/* Lado Direito  */}
        <div className="bg-gradient-to-b to-[#FBCE28] from-[#F5A13A] p-4 md:p-6 lg:p-10 flex flex-col items-center justify-center pt-8 md:pt-10 lg:pt-12 md:rounded-b-[80px]">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center mb-6 md:mb-8 text-black/80">
            Simulador de Financiamento ou Desvalorização
          </h2>
          <Card className="w-full max-w-[500px] md:max-w-md p-4 md:p-6 lg:p-8 space-y-4">
            <Tabs
              value={tab}
              defaultValue="financiamento"
              onValueChange={(val) =>
                setTab(val as 'financiamento' | 'desvalorizacao')
              }
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="financiamento">Financiamento</TabsTrigger>
                <TabsTrigger value="desvalorizacao">Desvalorização</TabsTrigger>
              </TabsList>

              <TabsContent value="financiamento">
                <SimuladorFinanciamento precoFipe={valorVeiculoFinanciamento} />
              </TabsContent>

              {/* Desvalorização */}
              <TabsContent value="desvalorizacao">
                <SimuladorDesv precoFipe={valorVeiculoDesvalorizacao} />
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </section>
  );
}

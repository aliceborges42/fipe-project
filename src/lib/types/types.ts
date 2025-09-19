export type Marca = { codigo: string; nome: string };
export type ModeloResponse = { modelos: { codigo: string; nome: string }[] };
export type Ano = { codigo: string; nome: string };
export type Veiculo = {
  Valor: string;
  Modelo: string;
  AnoModelo: number;
  Combustivel: string;
};

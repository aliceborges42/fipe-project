const BASE_URL = 'https://parallelum.com.br/fipe/api/v1';

export async function getBrands(type: 'carros' | 'motos' | 'caminhoes') {
  const res = await fetch(`${BASE_URL}/${type}/marcas`);
  if (!res.ok) throw new Error('Erro ao buscar marcas');
  return res.json();
}

export async function getModels(
  type: 'carros' | 'motos' | 'caminhoes',
  brandId: string
) {
  const res = await fetch(`${BASE_URL}/${type}/marcas/${brandId}/modelos`);
  if (!res.ok) throw new Error('Erro ao buscar modelos');
  return res.json();
}

export async function getYears(
  type: 'carros' | 'motos' | 'caminhoes',
  brandId: string,
  modelId: string
) {
  const res = await fetch(
    `${BASE_URL}/${type}/marcas/${brandId}/modelos/${modelId}/anos`
  );
  if (!res.ok) throw new Error('Erro ao buscar anos');
  return res.json();
}

export async function getVehiclePrice(
  type: 'carros' | 'motos' | 'caminhoes',
  brandId: string,
  modelId: string,
  yearId: string
) {
  const res = await fetch(
    `${BASE_URL}/${type}/marcas/${brandId}/modelos/${modelId}/anos/${yearId}`
  );
  if (!res.ok) throw new Error('Erro ao buscar preço do veículo');
  return res.json();
}

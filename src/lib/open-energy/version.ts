type GetProductVersionForMonthArgs = {
  productId: number;
  yearMonth: string;
  baseUrl: string;
  apiKey: string;
};

export async function getProductVersionForMonth({ productId, yearMonth, baseUrl, apiKey }: GetProductVersionForMonthArgs) {
  const response = await fetch(`${baseUrl}/v1/products/${productId}/versions/${yearMonth}`, {
    headers: {
      'x-api-key': apiKey,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to load product version');
  }

  return response.json();
}

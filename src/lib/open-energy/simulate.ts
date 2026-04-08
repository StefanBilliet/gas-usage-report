type SimulateProductVersionArgs = {
  productId: number;
  versionId: number;
  baseUrl: string;
  apiKey: string;
  payload: {
    postalCode: string;
    city: string;
    totalGasConsumption: number;
    residential: boolean;
  };
};

export async function simulateProductVersion({ productId, versionId, baseUrl, apiKey, payload }: SimulateProductVersionArgs) {
  const response = await fetch(`${baseUrl}/v1/products/${productId}/versions/${versionId}/simulate`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'x-api-key': apiKey,
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Failed to simulate product version');
  }

  return response.json();
}

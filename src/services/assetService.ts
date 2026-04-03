import api from '@/lib/api';
import type { AssetResponse, InvokeResponse } from '@/types';

interface SearchPayload {
  query: {
    selector: Record<string, unknown>;
  };
}

interface CreatePayload {
  asset: Array<Record<string, unknown>>;
}

interface UpdatePayload {
  update: Record<string, unknown>;
}

interface DeletePayload {
  key: {
    '@assetType': string;
    '@key': string;
  };
}

interface SearchParams {
  assetType: string;
  filter?: Record<string, unknown>;
}

export async function search<T>({
  assetType,
  filter = {},
}: SearchParams): Promise<T[]> {
  const payload: SearchPayload = {
    query: {
      selector: {
        '@assetType': assetType,
        ...filter,
      },
    },
  };

  const response = await api.post<AssetResponse<T>>('/query/search', payload);
  return response.data.result || [];
}

export async function createAsset<T>(
  assetType: string,
  data: Record<string, unknown>
): Promise<T> {
  const payload: CreatePayload = {
    asset: [
      {
        '@assetType': assetType,
        ...data,
      },
    ],
  };

  const response = await api.post<InvokeResponse<T>>(
    '/invoke/createAsset',
    payload
  );
  return response.data.result;
}

export async function updateAsset<T>(
  assetType: string,
  key: string,
  data: Record<string, unknown>
): Promise<T> {
  const payload: UpdatePayload = {
    update: {
      '@assetType': assetType,
      '@key': key,
      ...data,
    },
  };

  const response = await api.put<InvokeResponse<T>>(
    '/invoke/updateAsset',
    payload
  );
  return response.data.result;
}

export async function deleteAsset(
  assetType: string,
  key: string
): Promise<void> {
  const payload: DeletePayload = {
    key: {
      '@assetType': assetType,
      '@key': key,
    },
  };

  await api.delete('/invoke/deleteAsset', { data: payload });
}

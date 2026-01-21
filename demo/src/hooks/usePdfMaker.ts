import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const API_BASE = '/api';

interface Schema {
  id: string;
  name: string;
  componentMappings?: unknown[];
}

interface GenerateSchemaResponse {
  schemaId: string;
  schemaName: string;
  componentsMatched: number;
}

interface PreviewResponse {
  schemaId: string;
  schemaName: string;
  preview: {
    components: unknown[];
  };
}

// List all schemas
export function useSchemas() {
  return useQuery({
    queryKey: ['schemas'],
    queryFn: async () => {
      const res = await fetch(`${API_BASE}/schemas`);
      if (!res.ok) throw new Error('Failed to fetch schemas');
      return res.json() as Promise<{ schemas: Schema[] }>;
    },
  });
}

// Get a specific schema
export function useSchema(schemaId: string | null) {
  return useQuery({
    queryKey: ['schema', schemaId],
    queryFn: async () => {
      if (!schemaId) return null;
      const res = await fetch(`${API_BASE}/schema/${schemaId}`);
      if (!res.ok) throw new Error('Schema not found');
      return res.json() as Promise<Schema>;
    },
    enabled: !!schemaId,
  });
}

// Generate schema from data
export function useGenerateSchema() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ query, data }: { query?: string; data: unknown }) => {
      const res = await fetch(`${API_BASE}/schema/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, data }),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to generate schema');
      }
      return res.json() as Promise<GenerateSchemaResponse>;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schemas'] });
    },
  });
}

// Preview PDF components
export function usePreview() {
  return useMutation({
    mutationFn: async ({ schemaId, data, query }: { schemaId?: string; data: unknown; query?: string }) => {
      const res = await fetch(`${API_BASE}/pdf/preview`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ schemaId, data, query }),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to preview');
      }
      return res.json() as Promise<PreviewResponse>;
    },
  });
}

// Generate PDF with auto-detect schema
export function useGeneratePdf() {
  return useMutation({
    mutationFn: async ({ query, data }: { query?: string; data: unknown }) => {
      const res = await fetch(`${API_BASE}/pdf/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query, data }),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to generate PDF');
      }

      const schemaId = res.headers.get('X-Schema-Id');
      const schemaName = res.headers.get('X-Schema-Name');
      const blob = await res.blob();

      return { blob, schemaId, schemaName };
    },
  });
}

// Generate PDF with specific schema
export function useGeneratePdfWithSchema() {
  return useMutation({
    mutationFn: async ({ schemaId, data }: { schemaId: string; data: unknown }) => {
      const res = await fetch(`${API_BASE}/pdf/generate/${schemaId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Failed to generate PDF');
      }

      const blob = await res.blob();
      return { blob, schemaId };
    },
  });
}

// Health check
export function useHealthCheck() {
  return useQuery({
    queryKey: ['health'],
    queryFn: async () => {
      const res = await fetch('/health');
      if (!res.ok) return { status: 'error' };
      return res.json() as Promise<{ status: string }>;
    },
    refetchInterval: 5000,
  });
}

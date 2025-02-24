// SPDX-License-Identifier: Apache-2.0
// SPDX-FileCopyrightText: © 2024 Tenstorrent AI ULC
import axios from "axios";
import { InferenceRequest, RagDataSource } from "./types.ts";

export const getRagContext = async (
  request: InferenceRequest,
  ragDatasource: RagDataSource | undefined,
) => {
  const ragContext: { documents: string[] } = { documents: [] };

  if (!ragDatasource) return ragContext;

  try {
    const response = await axios.get(
      `/collections-api/${ragDatasource.name}/query`,
      {
        params: { query: request.text },
      },
    );
    if (response?.data) {
      ragContext.documents = response.data.documents;
    }
  } catch (e) {
    console.error(`Error fetching RAG context: ${e}`);
  }

  return ragContext;
};

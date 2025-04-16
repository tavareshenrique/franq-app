export async function fetchFinanceData() {
  try {
    const response = await fetch("/api/finance")

    if (!response.ok) {
      throw new Error(`Erro na requisição: ${response.status}`)
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error("Erro ao buscar dados financeiros:", error)
    throw error
  }
}

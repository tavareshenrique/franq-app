import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { fetchFinanceData } from "./api"

describe("fetchFinanceData", () => {
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {})
  })

  afterEach(() => {
    consoleErrorSpy.mockRestore()
  })

  it("should fetch and return finance data successfully", async () => {
    const mockData = { revenue: 1000, expenses: 500 }
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: vi.fn().mockResolvedValueOnce(mockData),
    })

    const data = await fetchFinanceData()

    expect(data).toEqual(mockData)
    expect(global.fetch).toHaveBeenCalledWith("/api/finance")
  })

  it("should throw an error if the response is not ok", async () => {
    global.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      status: 500,
    })

    await expect(fetchFinanceData()).rejects.toThrow("Erro na requisição: 500")
    expect(global.fetch).toHaveBeenCalledWith("/api/finance")
  })

  it("should throw an error if fetch fails", async () => {
    const mockError = new Error("Network error")
    global.fetch = vi.fn().mockRejectedValueOnce(mockError)

    await expect(fetchFinanceData()).rejects.toThrow("Network error")
    expect(global.fetch).toHaveBeenCalledWith("/api/finance")
  })
})
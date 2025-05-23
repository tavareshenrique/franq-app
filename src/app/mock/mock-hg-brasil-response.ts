export const mockData = {
  results: {
    currencies: {
      source: "BRL",
      USD: {
        name: "Dólar",
        buy: 5.42,
        sell: 5.42,
        variation: 0.5,
      },
      EUR: {
        name: "Euro",
        buy: 5.95,
        sell: 5.95,
        variation: 0.3,
      },
      GBP: {
        name: "Libra Esterlina",
        buy: 6.95,
        sell: 6.95,
        variation: -0.2,
      },
      ARS: {
        name: "Peso Argentino",
        buy: 0.06,
        sell: 0.06,
        variation: -1.2,
      },
    },
    stocks: {
      IBOVESPA: {
        name: "BM&F BOVESPA",
        location: "Sao Paulo, Brazil",
        points: 118000.0,
        variation: 1.5,
      },
      IFIX: {
        name: "Índice de Fundos Imobiliários B3",
        location: "Sao Paulo, Brazil",
        points: 2800.0,
        variation: 0.5,
      },
      NASDAQ: {
        name: "NASDAQ Stock Market",
        location: "New York, USA",
        points: 16500.0,
        variation: -0.3,
      },
      DOWJONES: {
        name: "Dow Jones Industrial Average",
        location: "New York, USA",
        points: 38500.0,
        variation: 0.2,
      },
      CAC: {
        name: "CAC 40",
        location: "Paris, French",
        points: 7500.0,
        variation: -0.1,
      },
      NIKKEI: {
        name: "Nikkei 225",
        location: "Tokyo, Japan",
        points: 39000.0,
        variation: 0.8,
      },
    },
    bitcoin: {
      blockchain_info: {
        name: "Blockchain.info",
        format: ["USD", "BRL"],
        last: 65000.0,
        buy: 64800.0,
        sell: 65200.0,
        variation: 2.5,
      },
      coinbase: {
        name: "Coinbase",
        format: ["USD"],
        last: 64900.0,
        variation: 2.3,
      },
      bitstamp: {
        name: "BitStamp",
        format: ["USD"],
        last: 64950.0,
        buy: 64800.0,
        sell: 65100.0,
        variation: 2.4,
      },
      foxbit: {
        name: "FoxBit",
        format: ["BRL"],
        last: 352000.0,
        variation: 2.1,
      },
      mercadobitcoin: {
        name: "Mercado Bitcoin",
        format: ["BRL"],
        last: 351500.0,
        buy: 351000.0,
        sell: 352000.0,
        variation: 2.0,
      },
    },
    available_sources: ["BRL", "USD", "EUR", "GBP", "ARS", "BTC", "LTC", "JPY", "CHF", "AUD", "CNY", "ILS", "ETH"],
    taxes: [],
  },
  execution_time: 0.0,
  from_cache: true,
}
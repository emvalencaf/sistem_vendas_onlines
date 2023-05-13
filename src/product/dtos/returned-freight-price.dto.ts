import { ResponseFreightCorreiosDTO } from '../../correios/dtos/response-freight-correios.dto';

interface ReturnedDelivery {
  deliveryTime: number;
  deliveryPrice: number;
  typeDelivery: number;
}
export class ReturnedFreightPriceDTO {
  delivery: ReturnedDelivery[];

  constructor(priceCorreios: ResponseFreightCorreiosDTO[]) {
    this.delivery = priceCorreios
      .filter(
        (priceCorreio) =>
          priceCorreio?.CalcPrecoPrazoResult?.Servicos?.cServico[0]?.Erro ===
          '0',
      )
      .map((priceCorreio) => ({
        deliveryPrice: Number(
          priceCorreio?.CalcPrecoPrazoResult?.Servicos?.cServico[0]?.Valor.replace(
            ',',
            '.',
          ),
        ),
        deliveryTime: Number(
          priceCorreio?.CalcPrecoPrazoResult?.Servicos?.cServico[0]
            ?.PrazoEntrega,
        ),
        typeDelivery:
          priceCorreio?.CalcPrecoPrazoResult?.Servicos?.cServico[0]?.Codigo,
      }));
  }
}

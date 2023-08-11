import { Pagamentos } from "./enums/pagamentos.js";
import { cardapio } from "./cardapio/cardapio.js";
class Caixa {
    constructor(metodoDePagamento, itens) {
        this.valorDoPedido = 0;
        this.tratarMetodoDePagamento(metodoDePagamento);
        this.calculaValorDeAbate();
        this.trataItens(itens);
        console.log(this.pagamento, this.valorDeAbate);
    }
    trataItens(itens) {
        if (!itens) {
            this.valorDoPedido = null;
            throw new Error("itens vazios");
        }
        else if (itens) {
            const items = itens;
            for (const item of items) {
                const [itemName, quantity] = item.split(',');
                let quantityNumber = Number(quantity);
                if (!cardapio.hasOwnProperty(itemName)) {
                    throw new Error(`Item ${itemName} não existe`);
                }
                else if (cardapio.hasOwnProperty(itemName)) {
                    const itemBuscado = itemName.trim();
                    const itemPreco = cardapio[itemBuscado];
                    console.log('Item:', item);
                    console.log('Quantidade:', quantityNumber);
                    const precoACobrar = itemPreco * quantityNumber;
                    this.valorDoPedido = (this.valorDoPedido + precoACobrar) * this.valorDeAbate;
                    console.log('valor do pedido:', this.valorDoPedido);
                    console.log('valor de abate:', this.valorDeAbate);
                }
            }
        }
    }
    tratarMetodoDePagamento(metodoDePagamento) {
        if (metodoDePagamento === 'debito') {
            this.pagamento = Pagamentos.debito;
        }
        else if (metodoDePagamento === 'dinheiro') {
            this.pagamento = Pagamentos.dinheiro;
        }
        else if (metodoDePagamento === 'credito') {
            this.pagamento = Pagamentos.credito;
        }
        else {
            throw new Error('Seu metodo de pagamento não existe');
        }
    }
    calculaValorDeAbate() {
        if (this.pagamento === 0) {
            this.valorDeAbate = 0.95;
            console.log(this.valorDeAbate);
        }
        else if (this.pagamento === 2) {
            this.valorDeAbate = 1;
            console.log(this.valorDeAbate);
        }
        else if (this.pagamento === 1) {
            this.valorDeAbate = 1.03;
            console.log(this.valorDeAbate);
        }
    }
}
const pedido1 = new Caixa('credito', ['chantily, 2', 'cafe,1']);

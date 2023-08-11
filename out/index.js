import { Pagamentos } from "./enums/pagamentos.js";
import { cardapio } from "./cardapio/cardapio.js";
class Caixa {
    constructor(metodoDePagamento, itens) {
        this.valorDoPedido = 0;
        this.tratarMetodoDePagamento(metodoDePagamento);
        this.calculaValorDeAbate();
        this.trataItens(itens);
        console.log(`Seu pedido saiu por R$${this.valorDoPedido}`);
    }
    trataItens(itens) {
        let HaCafe = false;
        let HaSanduiche = false;
        if (!itens) {
            this.valorDoPedido = null;
            throw new Error("itens vazios");
        }
        else if (itens) {
            const items = itens;
            for (const item of items) {
                const [itemName, quantity] = item.split(',');
                let quantityNumber = Number(quantity);
                if (!quantityNumber) {
                    throw new Error('Ofereça uma quantidade válida');
                }
                for (let letra of items) {
                    if (letra.includes('cafe')) {
                        HaCafe = true;
                    }
                    if (letra.includes('sanduiche')) {
                        HaSanduiche = true;
                    }
                }
                if (!cardapio.hasOwnProperty(itemName)) {
                    throw new Error(`Item ${itemName} não existe`);
                }
                else if (cardapio.hasOwnProperty(itemName)) {
                    const itemBuscado = itemName.trim();
                    if (itemBuscado === 'chantily' && !HaCafe || itemBuscado === 'queijo' && !HaSanduiche) {
                        throw new Error('Não se pode pedir um item sem seu elemento principal');
                    }
                    const itemPreco = cardapio[itemBuscado];
                    const precoACobrar = itemPreco * quantityNumber;
                    this.valorDoPedido = Number(((this.valorDoPedido + precoACobrar) * this.valorDeAbate).toFixed(2));
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
        if (this.pagamento === Pagamentos.dinheiro) {
            this.valorDeAbate = 0.95;
        }
        else if (this.pagamento === Pagamentos.debito) {
            this.valorDeAbate = 1;
        }
        else if (this.pagamento === Pagamentos.credito) {
            this.valorDeAbate = 1.03;
        }
    }
}
const pedido1 = new Caixa('debito', ['cafe, 2']);

import { Pagamentos } from "./enums/pagamentos.js";
class Caixa {
    constructor(metodoDePagamento, itens) {
        this.tratarMetodoDePagamento(metodoDePagamento);
        this.trataItens(itens);
        this.calculaValorDeAbate();
        console.log(this.pagamento, this.valorDeAbate);
    }
    trataItens(itens) {
        if (!itens) {
            this.valorDoPedido = null;
            throw new Error("itens vazios");
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
const pedido1 = new Caixa('debito', ['arroz, 2']);

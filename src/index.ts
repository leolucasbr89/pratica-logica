import { Pagamentos } from "./enums/pagamentos.js";
import { cardapio } from "./cardapio/cardapio.js";

class Caixa {
    pagamento: number
    valorDeAbate: number
    valorDoPedido: number = 0

    constructor(metodoDePagamento: string, itens: string[]) {
        
       this.tratarMetodoDePagamento(metodoDePagamento)
        this.calculaValorDeAbate()
        this.trataItens(itens)
        console.log(`Seu pedido com: ${itens} saiu por R$${this.valorDoPedido}`)

        
    }
    trataItens(itens: string[]|null|undefined) {
        if (!itens) {
            this.valorDoPedido = null
            throw new Error("itens vazios")
        } else if (itens) {
            const items = itens;
            for (const item of items) {
            const [itemName, quantity] = item.split(',');
            let quantityNumber = Number(quantity)

            if (!cardapio.hasOwnProperty(itemName)) {
                throw new Error(`Item ${itemName} não existe`)
                } else if (cardapio.hasOwnProperty(itemName)) {
                    const itemBuscado: string = itemName.trim()
                    //@ts-ignore
                    const itemPreco = cardapio[itemBuscado]
                    const precoACobrar = itemPreco * quantityNumber
                    this.valorDoPedido = Number(((this.valorDoPedido + precoACobrar) * this.valorDeAbate).toFixed(2))
                }
            }
        }
    }
    tratarMetodoDePagamento(metodoDePagamento: string) {
        if (metodoDePagamento === 'debito') {
            this.pagamento = Pagamentos.debito
        } else if (metodoDePagamento === 'dinheiro') {
            this.pagamento = Pagamentos.dinheiro
        } else if (metodoDePagamento === 'credito') {
            this.pagamento = Pagamentos.credito
        } else {
            throw new Error('Seu metodo de pagamento não existe')
        }
    }
    calculaValorDeAbate() {
        if (this.pagamento === 0) {
            this.valorDeAbate = 0.95
          
        } else if (this.pagamento === 2) {
            this.valorDeAbate = 1
            
        } else if (this.pagamento === 1) {
            this.valorDeAbate = 1.03
        } 
    }
}


const pedido1 = new Caixa('debito', ['combo1, 2'])

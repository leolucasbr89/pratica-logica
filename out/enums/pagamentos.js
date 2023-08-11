export var Pagamentos;
(function (Pagamentos) {
    Pagamentos[Pagamentos["dinheiro"] = 0] = "dinheiro";
    Pagamentos[Pagamentos["credito"] = 1] = "credito";
    Pagamentos[Pagamentos["debito"] = 2] = "debito";
})(Pagamentos || (Pagamentos = {}));
